## Extend out-of-the-box distributed tracing with OpenTelemetry

Dynatrace's OneAgent is able to profile and instrument most programing languages. In most modern day application architectures, micro-services can come in a variety of programing languages. In order to enable distributed tracing across these polygot applications, Dynatrace leverages OpenTelemetry to extend its distributed tracing capabilites.

For the hands-on exercises, we are using a popular e-commerce shopping application coded in Java which has some components in Python.

This section covers custom and automatic instrumentation with OpenTelemetry (traces) for Python, in order to link the spans generated from the Java code to the Python code, and form a complete distributed trace for each request.

What you will learn
- How to create custom spans and link them to existing traces
- How to enrich spans with relevant details
- How to simplify efforts using auto-instrumentation
- How to propagate context between different processes