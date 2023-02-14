## General background
You will already have an instance of the travel booking application, EasyTravel, setup for you for this lab exercise. ACE-BOX will provision everything needed for AWX, EasyTravel, and Dynatrace.

Before we get going, let's take a quick look at the AWX playbook `remediation.yml` that will be used to auto-remediate the memory leak. 

In the YAML definition below, the  playbook does the following tasks:
1. Enter the variable values.
2. Send a comment about the job to begin to the Dynatrace Problems API.
3. Get the Dynatrace entity ID for the memory leak problem. Establish that as a fact in the AWX job.
4. Get the Dynatrace process group instance (PGI) corresponding to the entity ID in (3).
5. Find the Dynatrace host ID for the PGI in (4).
6. While the problem is still open, extract the host's metadata as a JSON payload. 
7. Set as a job fact the IP address of the host using the metadata of (6).
8. Access the host with the IP address of (7). Stop EasyTravel.
9. Sleep for 30 seconds.
10. Restart EasyTravel using the IP address of (7) as the endpoint.
11. Wait until EasyTravel returns a **200** response code. 
12. Post a comment to the Dynatrace Problems API indicating the end of the job.

This gives us an idea of the process flow that we will walk through in this lab exercise.

*remediation.yml*
```
- hosts: localhost

  tasks:
    - name: input variables values
      debug:
        msg: "dt problem id {{ pid }}"
    - name: "push comment to dynatrace"
      uri:
        url: "{{ dynatrace_environment_url }}{{ dt_comments_api }}{{ pid }}/comments"
        method: POST
        validate_certs: no
        use_proxy: no
        headers:
          Content-Type: "application/json"
          Authorization: "Api-token {{ DYNATRACE_API_TOKEN }}"
        body:
          message: 'Ansible Play Started ({{ tower_job_id | default("0") }}): {{ awx_template_name }} - Remediation started -- [Ansible Job](http://{{ awx_dns_name }}/#/jobs/playbook/{{ tower_job_id | default("0") }})'
          context: "{{ dt_comment_context }}"
        body_format: json
    - name: get entityId
      set_fact:
        dt_entity_id: "{{impactedEntities | first}}"
      when: state == "OPEN"

    - name: "get dynatrace process instance info: dt get process info"
      uri:
        url: "{{ dynatrace_environment_url }}{{ dt_infrastructure_api }}processes/{{ dt_entity_id.entity }}"
        method: GET
        validate_certs: no
        return_content: yes
        headers:
          Content-Type: "application/json"
          Authorization: "Api-token {{ DYNATRACE_API_TOKEN }}"
        body_format: json
      when: state == "OPEN"
      register: dtprocessresponse

    - name: "get dynatrace process instance info: set facts from execution"
      set_fact:
        dt_process_host_id: "{{ dtprocessresponse.json.fromRelationships.isProcessOf[0] }}"

    - name: "get process hostname: dt get host info"
      uri:
        url: "{{ dynatrace_environment_url }}{{ dt_infrastructure_api }}hosts/{{ dt_process_host_id | upper }}"
        method: GET
        validate_certs: no
        return_content: yes
        headers:
          Content-Type: "application/json"
          Authorization: "Api-token {{ DYNATRACE_API_TOKEN }}"
        body_format: json
      when: state == "OPEN"
      register: dthostresponse

    - name: "get process hostname: set facts from execution"
      when: state == "OPEN"
      set_fact:
        dt_process_host_ip_address: "{{ dthostresponse.json.ipAddresses[0] }}"

    - name: "stop easytravel"
      when: state == "OPEN"
      uri:
        url: "http://localhost:8094/scenario/stop"
        status_code: 200
      register: result
      delegate_to: "{{ dt_process_host_ip_address }}"

    - name: "sleep for 30 seconds"
      when: state == "OPEN"
      wait_for:
        timeout: 30

    - name: "start easytravel"
      when: state == "OPEN"
      uri:
        url: "http://localhost:8094/scenario/start/UEM/Standard"
        status_code: 200
      register: result
      delegate_to: "{{ dt_process_host_ip_address }}"

    - name: "wait for easytravel portal to come up"
      when: state == "OPEN"
      uri:
        url: "http://localhost:8080/"
        status_code: 200
      register: result
      until: result.status == 200
      retries: 15
      delay: 10
      delegate_to: "{{ dt_process_host_ip_address }}"

    - name: "push comment to dynatrace"
      when: state == "OPEN"
      uri:
        url: "{{ dynatrace_environment_url }}{{ dt_comments_api }}{{ pid }}/comments"
        method: POST
        validate_certs: no
        use_proxy: no
        headers:
          Content-Type: "application/json"
          Authorization: "Api-token {{ DYNATRACE_API_TOKEN }}"
        body:
          message: 'Ansible Play Started ({{ tower_job_id | default("0") }}): {{ awx_template_name }} - Remediation completed successfully -- [Ansible Job](http://{{ awx_dns_name }}/#/jobs/playbook/{{ tower_job_id | default("0") }})'
          context: "{{ dt_comment_context }}"
        body_format: json
 ```

If you want to know what the placeholder values are for `dynatrace_environment_url` and others, you can find them in the defined variables in the AWX inventory, captured below.

```
{
  "dynatrace_environment_url": "https://XXXXXXX.live.dynatrace.com",
  "commentuser": "Ansible Playbook",
  "tower_user": "dynatrace",
  "tower_password": "dynatrace",
  "dtcommentapiurl": "{{ tenant }}/api/v1/problem/details/{{ pid }}/comments?Api-Token={{ DYNATRACE_API_TOKEN }}",
  "dteventapiurl": "{{ tenant }}/api/v1/events/?Api-Token={{ DYNATRACE_API_TOKEN }}",
  "dt_comments_api": "/api/v2/problems/",
  "dt_events_api": "/api/v1/events",
  "dt_infrastructure_api": "/api/v1/entity/infrastructure/",
  "dt_metrics_api": "/api/v2/metrics/",
  "dt_comment_user": "ansible",
  "dt_comment_context": "ansible AWX",
  "awx_dns_name": "awx.XX.YY.ZZ.AA.nip.io"
}
```
