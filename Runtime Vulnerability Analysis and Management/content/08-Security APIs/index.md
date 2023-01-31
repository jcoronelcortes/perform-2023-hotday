## Notifications and API

#### Security APIs

Alertts and notifications aren't the only way to get application security data out of Dynatrace.  Common use cases for using the security APIs are for reporting and other integrations where it doesn't make sense to use a webhook or other kind of notification.



To use the security APIs, you will need an authorization token that includes the `Read Security Problems` scope.  Click on your user icon in the upper left of the Dynatrace portal and click the `Personal Access Token` link.

![API Token Create](../../assets/images/10-create-personal-token.png)

![API Token Create](../../assets/images/10-appsec-token-create.png)

Make sure to copy the generated token into place that you can access it later.
![API Token Create](../../assets/images/10-appsec-token-create-2.png)


After creating the token and storing it in a place that can be accessed later, we will need to use the token to 

The security APIs can be accessed and tested out via Dynatrace's `Environment API v2' menu in the Dynatrace portal.

![API Navigation](../../assets/images/10-appsec-api-nav1.png)

Authorize the API page with the token just created to use the security APIs.
![API Navigation](../../assets/images/10-authorize-api1.png)
![API Navigation](../../assets/images/10-authorize-api2.png)
![API Navigation](../../assets/images/10-authorize-api3.png)


1. Using the `Security Problems` API, get all security problems with the associated `riskAssessment` data for each problem. 
  
![Security Problems API](../../assets/images/10-securityproblemsapi1.png)
![Security Problems API](../../assets/images/10-securityproblemsapi2.png)

The response:
![Security Problems API Response](../../assets/images/10-appsec-api-response1.png)

2. Using the `SecurityProblems/{id}` API, get the details of a specific security problem for the last 2 hours.  Make sure to include `relatedEntities` in the response.
- Use security problem id: *17149011943884502800*
- Add the `relatedEntities` data
- Filter for data from the last 2 hours
![Security Problems2 API Response](../../assets/images/10-appsec-api-tryitout-2nd-api-2.png)

*Note:* You can also get the security problem id for the second exercise by going to the UI.
![Security Problems API ID](../../assets/images/10-securityproblemid-ui.png)