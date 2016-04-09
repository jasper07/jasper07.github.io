---
layout: post
title: "Reuse and translatable texts"
date: 2016-04-09 20:18
comments: true
categories: 
keywords: sapui5, i18n, reuse, components
description: Merging translatable text bundles
---


Often when working on a suite of applications you will want to encapsulate common code into reusable libraries and or components. A requirement that has popped up a few times is how do you merge a reusable master text file with the translatable text file the applicaiton uses.

Below i show how its possible to merge an application i18n models texts with the texts from a reusable components i18n model.

Why would you want to do it? think the scenario where you are creating a suite of Sales and Distribution application, there is a common buiness vocabulary that you may want to share between applications.

The pic below shows a reusable component, later it will be loaded as a dependency in an application, in this simple example i am creating one text property which will be merged, ensure that the i18n model is created when the Component is instantiated.

<img src="{{ root_url }}/images/blog/reusable_component.PNG" />

Next for example we create an application with a single text also

<img src="{{ root_url }}/images/blog/application_component.PNG" />

And declare a simple view to show texts from the two sources

To consume the common component, inside the manifest under "dependencies" declare your component, declaring the "resourceRoots" will tell the application where to locate the module. In the example below the Component is saved as a BSP in the ABAP UI5 Repository.

<pre class="language-html"><code><mvc:View controllerName="test.reuse.myApp.controller.Main" xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc">
	<Button text="{i18n>myAppText}"/>
	<Button text="{i18n>commonText}"/>
</mvc:View>
</code></pre>

<pre class="language-javascript"><code>"sap.ui5": {
	"rootView": "test.reuse.myApp.view.Main",
	"resourceRoots": {
		"test.reuse.common": "/sap/bc/ui5_ui5/sap/zcommon"
	},
	"dependencies": {
		"minUI5Version": "1.32.1",
		"components": {
			"test.reuse.common": {
				"minVersion": "1.0.0"
			}
		}
	},
	"models": {
		"i18n": {
			"type": "sap.ui.model.resource.ResourceModel",
			"uri": "i18n/i18n.properties"
		}
	},
</code></pre>

If you are like me and developing teams that where members use both thier own and the WebIde you will want to overide the resource root and point to both local server resources and the cloud based workspace where you have the component, this is similar to how you would reference the source application from an extension project. If you set the "final" flag to true then any subsequent path registration will be ignored.

<pre class="language-javascript"><code>var sUrl;
if (window.location.host.match(/^(localhost|127.0.0.1|0.0.0.0)/)) {
	sUrl = "../common";
} else if (window.location.host.match(/^(pXXX)/)) {
 	sUrl = "/../orion/file/pXXXXtrial$PXXXXX-OrionContent/common/";
}

jQuery.sap.registerModulePath("test.reuse.common", {
    url: sUrl,
    final: true
});
</code></pre>

Don't forget to add the "neo-app.json" entries for the backend and orion paths

<pre class="language-javascript"><code>{
	"path": "/orion/",
	"target": {
		"type": "service",
		"name": "orion",
		"preferLocal": true
	},
	"description": "Orion Server"
}, {
	"path": "/sap/bc/ui5_ui5/sap/",
	"target": {
		"type": "destination",
		"name": "abap",
		"entryPath": "/sap/bc/ui5_ui5/sap/"
	},
	"description": "Gateway Server"
}
</code></pre>

So we have create a reuse component, add it as a dependency to our application, added options for finding the Component when run locally and from a server, all that is left is to get an instance of the reuse component and merge the i18n models, we do that in the applications component.

<pre class="language-javascript"><code>sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
		"use strict";

		return UIComponent.extend("test.reuse.myApp.Component", {
			metadata: {
				"manifest": "json"
			},

			init: function() {
				// get the i18n model for the app
				var oI18nModel = this.getModel("i18n");

				// get the common component
				var oCommonComponent = sap.ui.component({
					name: "test.reuse.common"
				});

				// get the common component resource bundle
				if (oCommonComponent) {
					var oBundle = oCommonComponent.getModel("i18n").getResourceBundle();

					// enhance the app i18n with the resources from the commmon component
					oI18nModel.enhance(oBundle);
				}
				// call the init function of the parent
				UIComponent.prototype.init.apply(this, arguments);
			}
		});
	});
</code></pre>

Then when we run the application, the two texts are merged into one model

<img src="{{ root_url }}/images/blog/application_merged_text.PNG" />