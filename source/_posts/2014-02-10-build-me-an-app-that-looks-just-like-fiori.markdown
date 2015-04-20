---
layout: post
title: "Build me an app that looks just like Fiori"
date: 2014-02-10 16:23
comments: true
categories: ["sapui5", "openui5", "javascript"]
keywords: sapui5, jQuery, promise
description: Article from InsideSAP on the advantages of building your own SAP Fiori App
---
*Originally published in InsideSAP Magazine*

SAPUI5 is a hot topic right now due to the popularity of the SAP Fiori mobile application suite. SAP Fiori is a collection of apps built on frequently used SAP functionality, they provide users with “an easy to use, consumer grade experience”, and SAPUI5 is the HTML5 library that makes it possible. A lot of customers are so impressed with the simple, consistent look and feel that they are requesting developers to “build me an app that looks just like Fiori”. Building mobile applications is not as simple as choosing a framework because it is aesthetically pleasing, there are many factors you need to consider, in this article you will get introduced to SAPUI5 and get an overview of what it delivers and what it doesn’t.

<img src="{{ root_url }}/images/blog/SAPUI5.png" />

What is SAPUI5?
SAP’s UI development toolkit for HTML5 also known as SAPUI5, enables developers to easily create write once, deploy (nearly) anywhere applications, without having to worry about cross-browser compatibility, touch device support or adherence to web standards.
The key features of the toolkit are
- a large set of configurable and customizable Rich UI controls including interactive charts and data visualizations, which work across all devices
- tools, templates and techniques for creating your own UI controls
- easy to use theming and branding tools
- available on all SAP platforms, ABAP, Java and HANA based
- has a programming model that gives a scalable, reusable structure to applications
- international language and RTL support
- built on top of some of the popular open source JavaScript libraries including JQuery and JQuery Mobile
- a low barrier for entry, targeting developers with HTML, CSS3 and JavaScript skills

# The differentiators
There are lots of alternatives in the HTML5 mobile space; they range from roll your own solutions combining open source libraries like jQuery, jQuery Mobile and Bootstrap, to mature commercial frameworks like Sencha Touch and Kendo UI. Some of the features that make SAPUI5 stand out from the others are
- Simplified Integration, SAPUI5 is optimized for OData service (Netweaver Gateway) consumption, seamlessly binding the data to the UI controls. Within a few lines of JavaScript you can connect to a backend and start consuming and manipulating data online.
- Interoperability, SAPUI5 is now on all platforms, each providing a set of backend UI Services for a consistent portal like way to manage end-to-end how users access and interact with SAPUI5 applications, covering roles, personalization and configuration. With the Theme Editor a consistent way to style and brand not only SAPUI5 but your Webdynpro application and NWBC.
- Scalability, SAPUI5 is a pivotal part of SAP’s “new” solutions UX strategy, it is being used in anger by SAP themselves on countless developments around the world, developers can develop locally using their favourite tools and then deploy to the server where familiar version control and transport mechanisms manage the dependencies and system synchronizations.
- Extensibility, SAPUI5 is very modular, this makes it easy to enhance or extend by writing your own code or by adapting third party libraries. SAP also provides Extension Points in their delivered applications, giving customers added flexibility to meet their requirements.

# What are the limitations?
If you have read any articles on Native vs. HTML5 mobile development you will are probably aware already what the limitations are.
- Very limited support for offline storage, simple scenarios can be catered for using the available local storage API’s, limited to 5 MB. Alternatives are available using third party plugins and techniques. To get any kind of data synchronization to a SAP backend would require a significant amount of effort.
- Minimal support for devices OS capabilities like GPS, audio and video
- Minimal support for application security
It has to be said that some of these short comings are not within the scope of the product and could be addressed by SAPUI5 when combined with a hybrid container like Apache Cordova (previously PhoneGap) and a mobile platform like SAP’s SMP 3.0. On the horizon OData Version 4 promises to provide better offline data sync capabilities and as HTML5 matures it is likely these feature and others will be incorporated into the product.

<img src="{{ root_url }}/images/blog/ses_app.png" />

# Takeaways
There are many things you need to consider when developing mobile applications for an Enterprise, multi-platform support, security, performance, usability, backend integration and offline capability to name a few. No one product will meet all your requirements. SAPUI5 is a good choice for rapidly creating online mobile applications that have a consistent consumer like experience and work across all devices.
Where SAPUI5 excels is in providing simplified integration, allowing your backend and frontend developers to easily communicate requirements and respond to them quickly. It has been designed to be extensible making it easy to grow and cater for your future requirements. Backend services are provided to manage both the development lifecycle and how users access applications, providing a consistent approach with existing developments and functionality. Lastly it is supported by SAP as part of the Netweaver licence and when it finally becomes Open Source it will be used by and supported by a much bigger community of developers, all the more reason to “build me an app that looks just like Fiori”.