## Hands on #5 - Synthetic SLO

#### You are a SRE tasked with tracking the uptime of your teams' applications and most important workflows from an outside-in view. You should provide an overall perspective as well as availability SLOs for specific applications and application groups.

1. Navigate to the <b>Synthetic</b> page found on your side menu and click 'Create synthetic monitor button'. 
2. Click 'Create a browser monitor' button.
3. Type in www.google.com or any generic, easy to access address. Hit 'next'.
4. Select <b>5min</b> as a frequency and <b>one location</b> (for example, Johannesburg), then click 'Next'.
5. Review the synthetic test summary, then click 'Create Monitor'.
6. Navigate back to the synthetic monitors list using the breadcrumb navigation or the side menu. Click the checkbox next to your monitor and select 'Duplicate' in the prompt box below. Enable the duplicated monitor.

![](../../assets/images/ex3im1.png)

![](../../assets/images/ex3im2.png)

7. Create one more monitor, this time against a different URL. We want this monitor to simulate a failure: http://httpstat.us/503. Once complete, you should have 3 monitors.

![](../../assets/images/ex3im3.png)

8. Select the two browser monitors running against google and click <b>Edit</b>.
9. Click the 'Add tags to these monitors' checkbox. Add key: Sitetype and value: Search

![](../../assets/images/ex3im4.png)

10. Navigate to the Service-level Objectives page and add a new SLO. Click the 'Synthetic Availability' button to populate the fields below. 
11. Remove the "mzName" filter, verify and create the SLO. Pin this to a dashboard to see results in real time. 
Note: You should see type("SYNTHETIC_TEST") in the entity selector once you remove the management zone filter.
12. Create a new SLO, following the steps outlined above in #10-11. This time, after removing the management zone filter, add the tag filter for the sitetype:search field we added earlier. Your entity selector should look like the following:

```
type("SYNTHETIC_TEST"),tag("Sitetype:Search")
```
13. Evaluate, create, and pin this new SLO to your dashboard.