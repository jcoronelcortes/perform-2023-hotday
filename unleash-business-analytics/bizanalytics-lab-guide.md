Perform 2023

Unleash Business Analytics with Dynatrace Grail

[Hands-on 1](#hands-on-1)

[Hands-on 2](#hands-on-2)

[Hands-on 3](#hands-on-3)

[Hands-on 4](#hands-on-4)

[Hands-on 4](#hands-on-5)

# Hands-on 1

## 1) User action naming
1. In the main menu, open group "Applications & Microservices"
1. Click on "Frontend"
1. Click on "easytravel-frontend"
1. Top-right menu, click on the three dots button "..."
1. Click on "Edit"
1. Click on "Capturing" menu group
1. Click on "User actions"
1. Scroll down to "User action naming rules"
1. **Click the middle tab "Naming rules for XHR actions"**
1. Click "Add naming rule"
1. Paste the text below in the field "Naming pattern"

```{userInteraction (default)} on "{elementIdentifier (default)}"```

1. Scroll down to validate in "Preview your rule"
1. Click "Save"

## 2) Key user actions

1. In the main menu, open group "Applications & Microservices"
1. Click on "Frontend"
1. Click on "easytravel-frontend"
1. Scroll down to find "Top 3 user actions" section
1. Click on "View full details" in this section
1. Scroll down to "Top 100 user actions" section, just below the charts
1. Click on the filter field and a dropdown list will appear
1. Change the dropdown from "in top 100 actions..." to "in all user actions"
1. In the filter, type "book now"
1. Find the action in the filtered table
1. Click on the name of the action
1. Top-right menu, click on "Mark as key user action"
1. Click on "User actions" in the breadcrumbs menu
1. Scroll down to the list of actions
1. Click on the tab "Key user actions (1)"
1. Find the action that was marked as key

## 3) Key request

1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Locate the filter field at the top of the page
1. Click on an empty area inside the field
1. Type "BookingService" (it's case insensitive)
1. Click on "View requests"
1. Scroll down to "3 top contributors"
1. Click on the name of the request "storeBooking"
1. In the top-right menu, click on "Mark as key request"

## 4) Create dashboard
1. In the main menu, open group "Observe and explore"
1. Click on "Dashboards"
1. Click on "Create dashboard"
1. Name it "Unleash Business Analytics"

### Add key user action tile 
1. In the tile filter, type "key"
1. Find the "Key user action" tile
1. Either drag and drop or double-click it
1. Select application and key user action name

### Add key request tile
1. In the tile filter, type "request"
1. Find the "Service or request" tile
1. Either drag and drop or double-click it
1. Select service and key request name

# Hands-on 2

## 1) Funnel chart

1. In the main menu, open group "Digital Experience"
1. Click on "Query user sessions"
1. Type the query below in the input field

```
SELECT FUNNEL(useraction.name='loading of page /easytravel/search' AS 'Search', useraction.name='click on "book now"' AS 'Book', useraction.name='click on "sign in"' AS 'Authenticate', useraction.name LIKE '*book journey for*' AS 'Pay') FROM usersession
```
4. Click on "Run query"
1. Click the pencil to edit the name of the chart
1. Change the name to "Conversion funnel"
1. Click on "Pin to dashboard"
1. Make sure your dashboard is selected
1. Click on "Pin"
1. Click on "Open dashboard"
1. Reposition the tile if needed
1. Click "Done" to exit the edit mode

## 2) Request attribute
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Server-side service monitoring" menu group
1. Click on "Request attributes"

### Capture "Loyalty Status" request attribute
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
1. Click on the process that appears
1. Click on "Continue"
1. Type "BookingService"
1. Click on "Search"
1. Select the class that was found
1. Click on "Continue"
1. Make sure "Use the selected class" is selected
1. Click on "Continue"
1. Type "checkloyalty" in the filter to find the method "private void checkLoyaltyStatus(...)"
1. Mark its checkbox
1. Click on "Finish"
1. Change "Capture" value from "Class name" to "2: java.lang.String"
1. Click "Save" in the method source section
1. Scroll up to the top of the page
1. Click "Save" at the top of the screen

### Validate data collection

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

## 3) Calculated service metric

### Create a multi-dimensional analysis view
1. In the main menu, open group "Applications & Microservices"
1. Click on "Services"
1. Click on "BookingService"
1. Click on "Create analysis view"
1. Select "Request count" as Metric
1. Leave "Aggregation" as "Count"
1. Delete the default "Split by dimension" value and type "loyalty" then click the auto-completed value "{RequestAttribute:Loyalty Status}"
1. Click the checkmark at the end of the field
1. Change the "View" type to "Bar"

### Create metric 

1. Click on "Create metric..."
1. Type "Count by Loyalty Status" on the "Metric name"
1. Click on "Create metric"
1. Click on "Create chart"
1. Click on "Run query"
1. Change format from Line to Column chart

## 4) Add chart to dashboard

1. Click on "Pin to dashboard"
1. Make sure our dashboard is selected
1. Type "Count by Loyalty Status" in the "Tile title" field
1. Click on "Pin"
1. Click on "Open dashboard"
1. Reposition the tile as needed

# Hands-on 3

## 1) RUM event ingestion

### Send
1. Open the URL of your easyTrade application
1. Open the developer console
1. Type

```
dynatrace.sendBizEvent("type-RUM", {"custom-attribute": 99})
```

## 2) Add to dashboard

1. In the main menu, open group "Business Analytics"
1. Click on "Explore business events"
1. Type the query

```
fetch bizevents
| filter event.type=="type-RUM"
```
1. Click on "Actions"
1. Click on "Pin to dashboard"
1. Type "Coming from RUM"

## 3) OneAgent capture rule

### Configure
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Open "Business Analytics" menu group
1. Click on "OneAgent"
1. Click on "Add new capture rule"
1. In rule name, type "Asset purchase" 

### Configure trigger
1. Click on "Add trigger"
1. For "Data source", select "Request - Path"
1. For "Operator", select "equals"
1. For "Value", type "/broker/api/trade/BuyAssets"

### Configure metadata
1. For "Event provider data source", select "Fixed value"
1. For "Event provider fixed value", type the URL of your easyTrade
1. For "Event type data source", select "Fixed value"
1. For "Event type fixed value", type "asset-purchase"

### Configura additional data
1. Click on "Add data field"
1. For "Field name", type "amount"
1. For "Data source", select "Request - Body"
1. For "Path", type "amount"

1. Click on "Add data field"
1. For "Field name", type "price"
1. For "Data source", select "Request - Body"
1. For "Path", type "price"

## 4) Add to dashboard

1. In the main menu, open group "Business Analytics"
1. Click on "Explore business events"
1. Type the query
```
fetch bizevents
| filter event.type=="asset-purchase"
```
1. Click on "Actions"
1. Click on "Pin to dashboard"
1. Type "Coming from OneAgent"

# Hands-on 4

## 1) JSON event
## 2) CloudEvent event
## 3) CloudEvent Batch event
## 4) Add to dashboard
1. Click on "Actions"
1. Click on "Pin to dashboard"
1. Type "Coming from API"

# Hands-on 5

## 1) Processing rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on Processing
1. Click on "Add rule"
1. For "Rule name", type "Calculate revenue"
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`

###
1. Under "Transformation fields", click on "Add item"
1. For "Type", select "double"
1. For "Name", type "price"
1. Leave toggles unchanged

###
1. Under "Transformation fields", click on "Add item"
1. For "Type", select "double"
1. For "Name", type "amount"
1. Leave toggles unchanged

###
1. For "Processor definition", type `FIELDS_ADD(trading_volume:price*amount)`

## 2) Bucket assignment rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on "Bucket assignment"
1. Click on "Add rule"
1. For "Rule name", type "Asset Purchase"
1. For "Bucket", select "Business events (1 year)"e
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`


## 3) Metric extraction rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on "Metric extraction"
1. Click on "Add business event metric"
1. For "Key", type "bizevents.easyTrade.trading_volume"
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`
1. For "Measure", select "Attribute value"
1. For "Attribute", type "trading_volume"

## 4) Queries

### Validate new attribute
1. In the main menu, open group "Business Analytics"
1. Click on "Explore business events"
1. Type the query

```
fetch bizevents
| filter event.type == "asset-purchase"
| fields price, amount, trading_volume
```
### Validate metric

1. In the main menu, open group "Observe and explore"
1. Click on "Data explorer"
