## Hands-on 2

### 1) Funnel chart

1. In the main menu, open group "Digital Experience"
1. Click on "Query user sessions"
1. Type the query below in the input field
    ```
    SELECT FUNNEL(useraction.name='loading of page /easytravel/search' AS 'Search', useraction.name='click on "book now"' AS 'Book', useraction.name='click on "sign in"' AS 'Authenticate', useraction.name LIKE '*book journey for*' AS 'Pay') FROM usersession
    ```    
1. Click on "Run query"
1. Click the pencil to edit the name of the chart
1. Change the name to "Conversion funnel"
1. Click on "Pin to dashboard"
1. Select the "Unleash Business Analytics" dashboard
1. Click on "Pin"
1. Click on "Open dashboard"
1. Reposition the tile if needed
1. Click "Done" to exit the edit mode

### 2) Request attribute

1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Server-side service monitoring" menu group
1. Click on "Request attributes"

#### Capture "Loyalty Status" request attribute
1. Click on "Define a new request attribute"
1. Type "Loyalty Status" on "Request attribute name"
1. Leave "Data type" as "Text"
1. Do not change "First value"
1. Do not change "Leave text as-is"
1. Do not change the checkboxes
1. Click on "Add new data source"
1. Change "Request attribute source" to "Java method parameter(s)"
1. Click on "Select method sources"
1. Type "backend" and choose the "tomcat easytravel-backend-*" process group
1. Click on any of the processes in the list
1. Click on "Continue"
1. Type "BookingService"
1. Click on "Search"
1. Select the class that was found
1. Click on "Continue"
1. Make sure "Use the selected class" is selected
1. Click on "Continue"
1. Type "checkloyalty" in the filter
1. Mark the checkbox for "private void checkLoyaltyStatus(...)"
1. Click on "Finish"
1. Change "Capture" value from "Class name" to "2: java.lang.String"
1. Click "Save" in the method source section
1. Scroll up to the top of the page
1. Click "Save" at the top of the screen

#### Validate data collection

1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Type "Request attribute" in the filter bar
1. Select "Loyalty Status"
1. You might have to wait 2 or 3 minutes and refresh
1. Click on "BookingService"
1. Click on "View requests"
1. Scroll down to the bottom of the page
1. Click the tab "Request attributes"
1. Expand the arrow at the right side of the row
1. Validate that the request attribute is showing data

### 3) Calculated service metric

#### Create a multi-dimensional analysis view
1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Click on "BookingService"
1. Click on "Create analysis view"
1. Select "Request count" as Metric
1. Leave "Aggregation" as "Count"
1. Delete the default "Split by dimension" value and type "loyalty" then click the auto-completed value "{RequestAttribute:Loyalty Status}"
1. Click the checkmark at the end of the field
1. Change the "View" type to "Bar"

#### Create metric 

1. Click on "Create metric..."
1. Type "Count by Loyalty Status" on the "Metric name"
1. Click on "Create metric"
1. Click on "Create chart"
1. Add the available dimension
1. Click on "Run query"
1. Change format from Line to Column chart


### 4) Add chart to dashboard

1. Click on "Pin to dashboard"
1. Make sure our dashboard is selected
1. Type "Count by Loyalty Status" in the "Tile title" field
1. Click on "Pin"
1. Click on "Open dashboard"
1. Reposition the tile as needed
