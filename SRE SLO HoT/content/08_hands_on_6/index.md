## Hands on #6 - Advanced SLO - Synthetic

#### You are investigating an issue with an ecommerce site. To track the current state, you create a test transaction (clickpath) to monitor the process. Based on the transaction you define two an SLO proving the availability for the shopping cart vs. checkout page.

1. Start by creating a browser monitor. Switch to script mode.

![](../../assets/images/ex3im6.png)

3. **Paste** the [provided script](../../assets/Addtocart.txt) and rename the monitor to 'Amazon Add to Cart'. Add one or two locations and set the frequency to the lowest value to start collecting data ASAP.
4. **Paste** the [provided script](../../assets/GoToCart.txt) and rename the monitor to 'Amazon Go to Cart'. Use similar locations and frequency settings to the test above.

2. Navigate to the Service-level Objectives page and add a new SLO. 

![](../../assets/images/handson6_2.png)

3. Click the 'Synthetic Availability' button to populate the fields below.

![](../../assets/images/handson6_3.png)

4. Provide a meaningful name/metric for the SLO. *{ENV}_{APP NAME}_{HoT#}_{ENTITY TYPE}_{TYPE}*

```
SLO Name : Prod - Easytravel - HoT5 - Synthetic - Availability
SLO Metric : prod_easytravel_hot5_synthetic_availability
```

![](../../assets/images/handson6_4.png)


5. Next, let's set the filters for the SLO.
> - Time Frame - the evaluation period of SLO. *last 30 minutes* </br>
> - Entity Selector - the entities from where SLI is calculated. *easytravel tag*</br>

```
timeFrame : -30m
entitySelector : type("SYNTHETIC_TEST"),tag(easytravel-advanced)
```

![](../../assets/images/handson6_5.png)

6. Next, let's set our SLO target.
> #### *Step 7 of the SLO Framework* </br>

```
Target - 95.0
Warning - 97.5
```

![](../../assets/images/handson6_6.png)

7. Finally, preview the SLO and hit 'Create'

8. Navigate to *Dashboards* and identify the following dashboard : *Perform 2023 HoT*

9. Edit the SLO tile of the current Hands-On, and select the SLO we just created: *Prod - Easytravel - HoT6 - Synthetic - Availability*



6. Dynatrace does not offer an out of the box availability metric for synthetic events (steps). So, we add the following:

``
(builtin:synthetic.browser.event.success)/(builtin:synthetic.browser.event.total)*(100):(splitBy())
``