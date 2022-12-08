## Hands on #2 - Application

#### Situation: You are a SRE tasked with defining and tracking a SLO for the user experience of the frontend.

1. Under <b>'Digital Experience'</b> on the left-hand menu, find <b>'Web'</b> and navigate to the Applications screen.
2. You will note thje <b>'My web application'</b> application that came out-of-the-box with Dynatrace. Remember this name, we will be using it later.
3. Navigate to the <b>'Service-level Objective'</b> screen and create a new SLO.
4. Select User Experience and provide a name for the SLO (in our example: EasyTravel UX)

![](../../assets/images/ex4im1.png)

5. Enter a filter under <b>Entity Selector</b>, using the below example. Note: We used the application name from step #2.

```
type(“APPLICATION”)entityName(“My web application”)
```
6. Preview the selection, verifying we see at least one application.
7. Add a success criteria with a target of 99.98 and a warning of 99.99. 

![](../../assets/images/ex4im2.png)

8. Review the configuration and verify the values shown make sense. Our status will likely be under the target. That is okay. Create the SLO.
