## Dynatrace APIs

In this section we will be using a <a href="https://www.sitespeed.io/documentation/coach/" target="_blank">node package called webcoach</a>  to give us some actionable recommendations on improving the performance of your Website to improve customer retention and satisfaction. We will be using this data to create a website improvement recommendation dashboard. When we combine the Coach data with Dynatrace, we can create a baseline and use live Dynatrace Synthetic monitoring to track how the improvements affect customer experience. 

Dynatrace provides a lot of power though its APIs. The two we will be focusing on today are the Events API and the Dashboard API. The best way to learn and try out the API endpoints is the swagger documentation built into the Dynatrace console. 

1.  If you don't have it open already, in your Dynatrace console, click the person icon in the top right corner of your tenant screen and click 'Environment API v2' to get to the Documentation. 

2. Once there, click 'Authorize' and input the API Key you created in a previous step. 


3. Scroll down until you find 'Events' and click to open the endpoint descriptions.


4. Now, scroll up to to the top of the page, and click on the 'Select a definition' drop down menu on the top right of the screen and click on 'Configuration API'. This is where you'll find the endpoints of the Dashboard API.

