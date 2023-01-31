## Getting familiar with RAP

This will have content that shows attacks etc.
CMDi attack in Unguard 

**TODO: get screenshots and exact steps for attack below. Also need to show what it looks like in Dynatrace**

Runtime Application Protection (RAP) is different than the application security capabilities that we've looked at so far.  RAP can actively detect and block exploits which means that we need to have attacks being generated to see anything.

**TODO: add some more theory

### Log into Unguard

To get into unguard, open the following URL `unguard.<your_DTU_lab_ID>.dynatrace.training`, sign up with any credentials you like and then log in with the same credentials.

![signup](../../assets/images/unguard_sign_up.png)

![login](../../assets/images/unguard_login.png)

## Command injection when posting markdown bio

Command injection (sometimes CMD injection) is an attack that involves executing arbitrary commands on some host OS.
Typically, this happens because of insufficient user input validation.

When posting a bio string with markdown enabled, the `profile-service` uses a shell program called markdown to do the
markdown to HTML conversion, but does not properly escape the user input, resulting in the possibility to execute
arbitrary shell commands.

### Exploitation

To exploit the command injection vulnerability in the `profile-service`, you have to log in, go to your own profile and
set a bio string with the checkmark "Enable markdown" checked, that contains additional commands.

Posting the following will result in executing `tail -n /etc/passwd` and taking the output of that to convert it from
markdown into HTML and write it into your bio.

```text
' & tail -n 1 '/etc/passwd
```

Sending that request will result in a similar command to be executed on the `proxy-service`:

```shell
/bin/sh -c echo '' & tail -n 1 '/etc/passwd' | markdown
```

![cmd_injection](../../assets/images/cmd_injection.png)

#### Examples

Writing linux kernel information into your bio:

```text
' & uname '-a
```
## Analyze results in Dynatrace
![cmd_injection_attack](../../assets/images/cmd_injection_attack.png)


#### Further Details

* [Command Injection - OWASP](https://owasp.org/www-community/attacks/Command_Injection)
* [Improper Neutralization of Special Elements used in a Command - CWE](https://cwe.mitre.org/data/definitions/77.html)




## SQL Injection

Utilizing [SQL injection](https://owasp.org/www-community/attacks/SQL_Injection) can lead to sensitive data being read
and/or databases to be modified (Insert/Update/Delete).
In addition, administrative operations such as shutting down the DBMS can also be completed.

Unguard provides the functionality to upload a biography text for each user, and as the string is not checked before
being inserted into an SQL statement, it is possible to insert SQL commands which will then be run.


### Exploitation

To inject an SQL command, you simply need to log into Unguard, go to your profile page and insert a bio including some
SQL statements which need to be properly prepared (see the next chapter "w/o Toolkit CLI").

SQL injections are possible via the frontend. As mentioned before, you can upload a bio including SQL
code on the profile page.

An example for an SQL statement to run:

```sql
UPDATE bio
SET bio_text = 'injected'
WHERE 1 = 1;
```

This will set the bio_text to 'injected' for every user that already had a bio set.

In order to inject this into the database, the content of the bio needs to be adapted slightly:

1. Bio already exists (button says 'Update Bio')

```
' WHERE 0 = 1; UPDATE bio SET bio_text = 'injected' WHERE 1 = 1; --
```

As you can see, the `'` in the beginning as well as the `--` in the end are added to allow the statement to be
run without causing an error.

2. Bio doesn't yet exist (button says 'Add Bio')

```
'); UPDATE bio SET bio_text = 'injected' WHERE 1 = 1; --
```

In this case, the beginning has to be slightly different to accommodate the syntax of the ```INSERT INTO``` statement.

#### Examples

Deleting all entries of the table:
```h2
TRUNCATE TABLE bio;
```

#### Further Details

* [SQL Injection - OWASP](https://owasp.org/www-community/attacks/SQL_Injection)
