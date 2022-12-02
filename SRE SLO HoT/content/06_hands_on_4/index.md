## Hands on #4 - Advanced SLO - Service

#### The business and dev teams have recently introduced a new function in the application that calculates travel recrecommendations for customers visiting the website. The business has determined that they want a separate, and granular SLO to track this single function, instead of the service overall (which is what we just did in the previous hands on). They want to track an SLO with a 15% error budget.In order to do this, we’ll need to: 
#### Create 2 custom metrics for our new request: Total count, and success count
#### Define an SLO with success as the numerator and total count as denominator. 

1. Navigate to Services in the left-hand menu. The request we need to build an SLO for is inside our easyTravel Customer Frontend service.
2. Find and click on easyTravel Customer Frontend. (Tip: You can search for the service in the filter bar)
3. CLick on View dynamic requests so we can find the function we're looking for.
4. Scroll down on this new page and identify the /CalculateRecommendations transaction.
5. Click the analysis button to the right of the transaction, shown in the image below.
</br></br>

![](../../assets/images/Ex2Im1.png)

</br></br>
6. This will navigate you to the multidimensional analysis view. Under 'Configure View', change the Metric dropdown to 'Request count". This counts the <b>total</b> number of requests for this transaction. 
7. Click on Create metric. Name your metric 'CalculateRecommendationsCount' and click create metric at the bottom of the create metric box.
</br></br>

![](../../assets/images/Ex2Im2.png)

</br></br>
8. For the second metric, change the dropdown to 'Successful request count". Name this metric 'Calculate Recommendations Success Count". Create the metric.
9. Return to the SLO page by either navigating to a previous tab, or selecting 'Service-Level Objectives' from the left-hand menu. Click 'Add new SLO'.
10. Name the new SLO. 
11. To calculate this SLO, we will divide our success metric count by the total metric count. Your metric definition will look something like this (using your own metric IDs in place of the example):

```
((100)*(calc:service.validatecreditcardsuccesscount:sum)/(calc:service.validatecreditcardtotalcount))
```

12. Because we specific scope by selecting a specific service, we do not need to define it under the Entity Selector section. We can keep this field blank.
13. For our success criteria, we can use a target of 99.75 and a warning of 99.95. 
14. Evaluate the newly minted SLO and click create.