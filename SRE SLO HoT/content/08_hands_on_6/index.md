## Hands on #6 - Advanced SLO - Synthetic

#### You are investigating an issue with an ecommerce site. To track the current state, you create a test transaction (clickpath) to monitor the process. Based on the transaction you define two an SLO proving the availability for the shopping cart vs. checkout page.

1. Start by creating a browser monitor. Switch to script mode.

![](../../assets/images/ex3im6.png)

3. **Paste** the [provided script](../../assets/Addtocart.txt) and rename the monitor to 'Amazon Add to Cart'. Add one or two locations and set the frequency to the lowest value to start collecting data ASAP.
4. **Paste** the [provided script](../../assets/GoToCart.txt) and rename the monitor to 'Amazon Go to Cart'. Use similar locations and frequency settings to the test above.
5. Lets create the SLO now. Navigate to the SLO wizard. Do not select any presets. Name this SLO Amazon Add to Cart.
6. Dynatrace does not offer an out of the box availability metric for synthetic events (steps). So, we add the following:

``
(builtin:synthetic.browser.event.success)/(builtin:synthetic.browser.event.total)*(100):(splitBy())
``

6. As a filter we use the entityId for the synthetic test step in our add to cart script. For this example, we can use the first step. Example step below (do not use this example, use your own).

![](../../assets/images/ex3im5.png)

``
SYNTHETIC_TEST_STEP-BD5E4D70B8701DCF
``

8. Repeat steps 4-6, using the Go to Cart test and an ID of a specific step as described in #6.
9. Validate your data is coming through.