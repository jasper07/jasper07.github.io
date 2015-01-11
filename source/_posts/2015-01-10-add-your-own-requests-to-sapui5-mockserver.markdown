---
layout: post
title: "Add your own requests to SAPUI5 MockServer"
date: 2015-01-10 22:36
comments: true
categories: ["sapui5", "openui5", "javascript"]
keywords: "sapui5, openui5, javascript, dcode, fiori, SAP"
description: "Adding your own xhr mock to SAPUI5 MockServer"
---

A couple of weeks ago I was playing around with SAP HCP Trial WebIDE and noticed that the Fiori sample applications were using the MockServer for all OData Entity requests and also for the custom OData Function Imports.

This week I had a requirement to create a simple Function Import, the function calls the backend SAP system to determine whether or not to show a button, I used this had an opportunity to investigate and learn how to add my own mock xhr request to the SAPUI5 Mockserver and thought I would share.

To add your own requests to a MockServer instance is quite simple, first set up the MockServer, retrieve the current requests, then add your request and then set the updated requests back to Mockerver.

<pre class="language-javascript"><code>//initialize the MockServer as per normal
jQuery.sap.require("sap.ui.core.util.MockServer");
var oMockServer = new sap.ui.core.util.MockServer({
	rootUri: sServiceUrl
});
oMockServer.simulate("model/metadata.xml", "model/");
 
//add your requests to the ones already set 
try {
  jQuery.sap.require("myapp.model.mockRequests");
  var aMyRequests = myapp.model.mockRequests.getRequests();
  if (aMyRequests.length > 0) {
    oMockServer.setRequests(oMockServer.getRequests().concat(aMyRequests));
  }
} catch (oErr) {
  jQuery.sap.log.debug(oErr.message);
}
 
//start the mockserver
oMockServer.start();
</code></pre>

The documentation for [UI5 MockServer setRequests](https://openui5.hana.ondemand.com/#docs/api/symbols/sap.ui.core.util.MockServer.html#setRequests) gives a good explanation on the structure of requests

{% blockquote %}
method : "GET"|"POST"|"DELETE|"PUT" 
path : "/path/to/resource"
response : function(xhr, param1, param2, ...) { }  
{% endblockquote %}

Here is the code I wrote for the ShowAddButton Mock call
<pre class="language-javascript"><code>sap.ui.define(['jquery.sap.global'],
    function(jQuery) {
        "use strict";
        var mockRequests = {
            /**
             * This mock determines whether the '+' add button should be shown
             */
            mockShowAddButton: function() {
                return {
                    method: "GET",
                    path: new RegExp("ShowAddButton?(.*)"), 
                    response: function(oXhr, sUrlParams) {
                        jQuery.sap.log.debug("Incoming request for ShowAddButton");
                        oXhr.respondJSON(200, {}, JSON.stringify({
                            d: {
                                ShowAddButton: true
                            }
                        }));
                    }
                };
            },
            /**
             * get requests
             * @return {array} Array of mock request
             */
            getRequests: function() {
                return [mockRequests.mockShowAddButton()];
            }
        };
        return mockRequests;
    },
    true);
</code></pre>
   
For those interested here's a link to the [Fiori Reference Apps](http://scn.sap.com/docs/DOC-59963)

in the WebIDE you can find them under File->New->Project from Sample Application
