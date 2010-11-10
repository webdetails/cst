Installation instructions:

Copy template-dashboard-clean.html to solution/system/pentaho-cdf/ and place CST dir right
under solutions dir


Then point pentaho to open this at user login by hand editing (sorry, no way around this) the
MantleSettings.properties file that exists inside mantle-<version>.jar in pentaho server web-inf directory.


For instance:
pentaho-server/webapps/pentaho/WEB-INF/lib/mantle-3.6.0-stable.jar#uzip/org/pentaho/mantle/server

Use the following snippet:

num-startup-urls=1
startup-url-1=/pentaho/content/pentaho-cdf/RenderXCDF?solution=CST&path=%2F&action=cst.xcdf&template=mantle
startup-name-1=CST


