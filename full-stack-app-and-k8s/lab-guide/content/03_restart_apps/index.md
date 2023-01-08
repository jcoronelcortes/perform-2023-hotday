## Restart Apps

In most real world circumstances, we will be deploying the Dynatrace Operator on servers with applications running.

By default, OneAgent comprises a set of specialized processes that run on each monitored host. It collects metrics from the operating system on which it runs, and compares the metrics to expected performance values. The most important metrics are then reported to Dynatrace. In addition, OneAgent detects which processes run on each host and collects performance metrics for the most important processes. OneAgent can also perform more detailed monitoring of specific technologies (such as Java, Node.js, .NET, and others) by injecting itself into those processes and monitoring their performance from within. 

So certain screens like Host, Processes would have metrics while Smartscape and Services will be lacking in information.

For detailed monitroing of specific technologies, we will need to recycle / restart the necessary applications.
