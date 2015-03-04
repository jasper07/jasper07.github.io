---
layout: post
title: "Shorten Fiori URLs"
date: 2015-03-05 01:35
comments: true
categories: ["Fiori", "SAPUI5", "ABAP"]
keywords: "Fiori, SAPUI5, ABAP", "URL"
description: "A quick post on how to shorten Fiori URLs so they can be sent via SMS"
---

I recently had a requirement to send links to Fiori apps to users via SMS. One of main challenges was how to shorten the URL links  to the allowable 160 characters, this blog quickly highlights some of the steps taken. 

**Requirement**

The URL sent to the users via SMS should open a SAPUI5 application in a Fiori launchpad headerless window. The application is very similar to a WorkFlow app, where in a user accepts are rejects a task. The link needs to contain the paramaters and context necessary for the application to be started with the correct state, the right screen, the right data etc. 


**The Challenge**

The main challenge faced was how to shorten the URL, the Fiori Launchpad URL is quite long before you start adding context, the template below is already at the 200 character mark 

`https://<server>:<port>/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?`

`sap-client=000&sap-language=EN`

`#<Semantic_object>-<Action>/<route_name1>/<route_number1>/<route_name2>/<route_number2>`

add the parameter for removing the shell header

`sap-ushell-config=headerless`

and the URL that needs to be sent is exceeding 240 characters. How to limit the size of the URL to the 160 characters allowed by SMS?

**Analysis**

I guess there are a lot of ways to shorten the URL, the first thought was using a URL shortening service, the SAP Portal provides shortened URL's for its content paths, unfortunately there is nothing similar for the ABAP based WebAS. The second thought was to use something like goo.gl or bit.ly. I found a couple of of ABAP based projects which provided code for using these services, however for me to implement them there would have been some technical challenges to using them.


**Solution**

The option we came up with i think does the job quite well.

* Use an SICF [External Alias](http://help.sap.com/saphelp_nw70ehp2/helpdata/en/78/9852bdc06b11d4ad310000e83539c3/content.htm), I like to use Alias's as quick links

`https://<server>:<port>/flp`

* the SICF service has an ABAP HTTP Request handler which programatically redirects the browser to the Fiori Launchpad

{% blockquote %}
  lv_url = |/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?foo=bar... |.
  server->response->redirect( url = lv_url ).
{% endblockquote %}

* Flatten and simplify the remaining needed parameters, on the links sent to the users
 use `cl_http_utility=>encode_base64` to obfuscate and hide the details from the user and
 use `cl_http_utility=>decode_base64` in the http handler to map back the routing parameters  

`https://<server>:<port>/flp/{<Action><route_number1><route_number2>}`

The result was a URL that fit well within the 160 character limit SMS has.

One more thing [Configuration Table HTTPURLLOC](http://help.sap.com/saphelp_nw73ehp1/helpdata/en/48/6b380633f0350ce10000000a42189d/content.htm) - this table allows for entries with valid protocol, host and port combinations, can be set up and used for generating the external facing URLs sent to users for each of the ABAP Fiori instances.
