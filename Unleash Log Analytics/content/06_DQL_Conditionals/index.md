## Conditional Statements

In this lab, we will use the following functions to implement conditionals:

<hr/>
- if-else 
- countif
- isNotNull, isNull

<hr/>

### IF-ELSE

Evaluates the condition, and returns the value of either the then or else parameter, depending on whether the condition evaluated to true (then) or false or null (else - or null if the else parameter is missing).

#### Syntax

`if(<condition>, <true_statement> , else:<false_statement>)`

#### Example

Using the if function, we expand the day of week to its full form. Note: the samplingRatio is deliberately put high to demonstrate the functionality. If you decrease this value, the query time increases proportional to the logs in the timeframe searched.

```
fetch logs, from:now()-7d, to:now(), scanLimitGBytes:500, samplingRatio:100000
| fieldsAdd day= formatTimestamp(timestamp,format:"E") // https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html
| fieldsAdd DayOfWeek=if(day=="Mon","Monday",else:if(day=="Tue","Tuesday",else:if(day=="Wed","Wednesday",else:if(day=="Thu","Thursday",else:if(day=="Fri","Friday",else:if(day=="Sat","Saturday",else:"Sunday"))))))
| summarize count(),by:{DayOfWeek}
```

<hr/>

### countIf

Counts the number of records that match the condition.

#### Syntax

`countIf(Expression)`

#### Example

The example query counts the number of log lines in the last two minutes if the log line contains log level ERROR

```
fetch logs, from:now()-2m
| summarize Error_count = countif(loglevel == "ERROR")
```

<hr/>

### isNotNull, isNull

Tests if a value is not NULL. This is particularly useful when you want to filter out empty or null rows in your results.

#### Syntax

`isNotNull(<fieldName>)`

#### Example

In this example, we filter (select) data where the log.iostream contains a value.

```
fetch logs, from:now()-1d
| filter isNotNull(log.iostream)
| fields log.iostream
| limit 20
```

You can use the `isNull` function to filter (select) data where the log.iostream does not contain a value.

```
fetch logs, from:now()-1d
| filter isNull(log.iostream)
| limit 20
```

<hr/>
