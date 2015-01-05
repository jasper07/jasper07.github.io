---
layout: post
title: "Beyond SAP Fiori's 1:1:3"
date: 2015-01-04 22:48
comments: true
categories: ["sapui5", "openui5", "javascript"]
keywords: "sapui5, openui5, javascript, dcode, fiori, SAP"
description: "The slides from a talk i gave at SAP Dcode 2014, covers some of the best practice for buildig SAPUI5 apps"
---

{% speakerdeck 8086964076310132049b22819074b7b4 %}

A few people have asked me to share the slides from the talk i gave at SAP Dcode 2014 Las Vegas.

The talk was aimed at developers who had already started writing SAPUI5 apps, the objective was to highlight a variety of patterns, principles and best practices to help them take their development to the next level.

The takeaway points

**1. Follow JS Best Practices** - a lot of the tutorials and documentation for SAPUI5 is centered around using Eclipse as an IDE, in my opinoin which is shared by many others there is "no one size fits all", to get the right developer workflow it is better to build your JS developer toolchain from the ground up, that way you get to know what works and why. Start by investigating how developers using other JS toolkits and frameworks set up theirs, experiment, add the additional functionality as it is needed rather than start with something that is preconfigured and abstracts away the detail making it hard to change. The best practices section covered thngs like the need for automating repetitive develop, build and deploy tasks using Grunt, using a distributed version control system like git to reduce the risk of introducing errors, and ensuring the quality of the code pushed back to SAP is always production ready, also covered was following Web development best practices to reduce the complexity and improve the performance of your apps etc.

**2. Dont Build Big Apps** - this is true for any programming paradigm, dont build big apps, build lots of small ones, wire them together with events. In this section I covered the different techniques available for modularizing your code into smaller units, and then how to bring the small units together using techniques like routing, which enable you to set up the state of the application from the URL, ie what views need to be visible and what data needs to be shown and then how to use events to seamlessely navigate to different states of the application. 

**3. Use fit-for-purposes API's** - the inside-out approach for creating services with Netweaver Gateway sounds like a good idea, take an existing BAPI and expose it. This approach lends itself to complexity, for starters BAPI's are normally quite complex to start with, they have to cater for lots of different scenarios, as you come accross business logic and functionality not available in the BAPI developers will often try workarounds and build the logic into the front end. In this section I talked about the advantages of taking a model first approach, let the data drive the application not the other way around, flesh out the screens you have designed and build an infomation architecture. Use this as a basis for a data model to build your Gateway services from, once your have modeled your services, you can then quickly create Mock Data for the service, this will allow UI5 developers to quickly build the shell of the application and validate the completeness of the data model. Other benefits of using Mock Data first, it means that development can happen in parallel, different parts of the UI can be developed independent of the other UI developments and the backend ABAP developers who will be building the services, using the MockData server makes it easy to create Unit and End-to-End tests allowing you to quickly find issues, perfect for quickly validating new feature request and changes made during bug fixes.

The Fiori 1:1:3 mantra was a timely reminder to keep UI design simple, rather than building one size fits all applications, the same thinking should be applied to development and how we develop, regardless of the size of apps we are building, keep things simple and fit for purpose.