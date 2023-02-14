## Hands-on 5

### 1) Processing rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on Processing
1. Click on "Add rule"
1. For "Rule name", type "Calculate revenue"
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`

#### Fields
1. Under "Transformation fields", click on "Add item"
1. For "Type", select "double"
1. For "Name", type "price"
1. Leave toggles unchanged

#### Fields
1. Under "Transformation fields", click on "Add item"
1. For "Type", select "double"
1. For "Name", type "amount"
1. Leave toggles unchanged

#### Processor definition
1. For "Processor definition", type `FIELDS_ADD(trading_volume:price*amount)`

### 2) Bucket assignment rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on "Bucket assignment"
1. Click on "Add rule"
1. For "Rule name", type "Asset Purchase"
1. For "Bucket", select "Business events (1 year)"
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`


### 3) Metric extraction rule
1. In the main menu, open group "Manage"
1. Click on "Settings"
1. Click on "Business Analytics" menu group
1. Click on "Metric extraction"
1. Click on "Add business event metric"
1. For "Key", type "bizevents.easyTrade.trading_volume"
1. For "Matcher (DQL)", type `event.type=="asset-purchase"`
1. For "Measure", select "Attribute value"
1. For "Attribute", type "trading_volume"

### 4) Queries

#### Validate new attribute
1. In the main menu, open group "Business Analytics"
1. Click on "Explore business events"
1. Type the query

```
fetch bizevents
| filter event.type == "asset-purchase"
| fields price, amount, trading_volume
```
#### Validate metric

1. In the main menu, open group "Observe and explore"
1. Click on "Data explorer"
1. Type `bizevents.easyTrade.trading_volume` in "Select metric" field
1. Click on "Run query"
1. Wait for the first data points to appear
1. Click on "Pin to dashboard"
