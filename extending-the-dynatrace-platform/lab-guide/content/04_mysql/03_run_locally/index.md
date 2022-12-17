## Running locally

There is a way to locally run this extension if you have an Activegate installed on the current machine.  
This can significantly speed up development time, and we are looking to add this feature to the `Dynatrace Copilot Extension` as well.


### Local Configuration

Create a file called `config.json` in the `mysql` folder with the contents:

```json
{
	"enabled": true,
	"description": "MySQL Local",
	"version": "0.0.1",
	"featureSets": [
		"basic"
	],
	"sqlMySqlRemote": {
		"endpoints": [
			{
				"host": "localhost",
				"port": 3306,
				"databaseName": null,
				"authentication": {
					"scheme": "basic",
					"username": "root",
					"password": "root"
				}
			}
		]
	}
}

```

The command to run this extension locally is a bit long:

```powershell
&"C:\Program Files\dynatrace\remotepluginmodule\agent\res\dsruntime\java\bin\java.exe" -cp "C:\Program Files\dynatrace\remotepluginmodule\agent\res\java\commonjars\dynatracesourcesql.jar;C:\Program Files\dynatrace\remotepluginmodule\agent\res\java\libs\*"  com.dynatrace.datasource.SQL --actConfig "config.json" --extConfig "extension\extension.yaml"
``` 

There is a file called `run.ps1` in the mysql folder of the supporting materials that you can copy to the `mysql` folder and run instead

```powershell
.\run.ps1
```

You should see metrics being reported to the console if everything was setup correctly:

```
[]2022-12-16 | 19:07:08.406 | pool-1-thread-2      |  INFO | c.d.s.c.EecCommunication  | Sending metrics now.
mysql.statements.count,device.address="127.0.0.1",device.name="localhost",statement="statement/sql/delete",device.port="3306",device="localhost:3306" gauge,0.0 1671239216605
mysql.statements.count,device.address="127.0.0.1",device.name="localhost",statement="statement/sql/insert",device.port="3306",device="localhost:3306" gauge,0.0 1671239216605
mysql.statements.count,device.address="127.0.0.1",device.name="localhost",statement="statement/sql/select",device.port="3306",device="localhost:3306" gauge,222.0 1671239216605
mysql.statements.count,device.address="127.0.0.1",device.name="localhost",statement="statement/sql/update",device.port="3306",device="localhost:3306" gauge,0.0 1671239216605
```

### Important

The `config.json` is **NOT** part of the extension development, it is just used to run the extension locally.  
You can also skip this step altogether, but just note that this can help you more quickly iterate (ie change a query, run it, see the results, change it again, run it again, etc)