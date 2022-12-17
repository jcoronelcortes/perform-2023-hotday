## MySQL extension

Let's add a query that will tell us **how many statements of each type** are being executed on the database.

There are a few ways to collect this information from MySQL, one of them is with the query:

```sql
SELECT EVENT_NAME, COUNT_STAR
      FROM performance_schema.events_statements_summary_global_by_event_name
      WHERE EVENT_NAME IN (
                          'statement/sql/select', 
                          'statement/sql/insert', 
                          'statement/sql/update', 
                          'statement/sql/delete' 
                          )
```

To do so, add the `sqlMysql` session to the `extension.yaml` file.

```yaml
sqlMySql:
  - group: Global Status
    query: | 
      SELECT EVENT_NAME, COUNT_STAR
      FROM performance_schema.events_statements_summary_global_by_event_name
      WHERE EVENT_NAME IN (
                          'statement/sql/select', 
                          'statement/sql/insert', 
                          'statement/sql/update', 
                          'statement/sql/delete' 
                          )
```

Note that we **must** define a group.
Now let's tell Dynatrace what metrics and dimensions we want from that query.
Add the `metrics` and `dimensions` sections to the `sqlMySql` session.


```yaml
sqlMySql:
  - group: Global Status
    query: | 
      SELECT EVENT_NAME, COUNT_STAR
      FROM performance_schema.events_statements_summary_global_by_event_name
      WHERE EVENT_NAME IN (
                          'statement/sql/select', 
                          'statement/sql/insert', 
                          'statement/sql/update', 
                          'statement/sql/delete' 
                          )
    metrics:
      - key: mysql.statements.count
        value: col:count_star
    dimensions:
      - key: statement_type
        value: col:event_name
```

This is declaring:

1. Run the query every minute (default, we could have set an interval as well)
2. Extract a dimension called `statement_type` from the column `event_name`
3. Extract a metric called `mysql.statements.count` from the column `count_star`
