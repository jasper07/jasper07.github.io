---
layout: post
title: "Beyond SAP Fiori's 1:1:3"
date: 2015-01-04 22:48
comments: true
categories: ["sapui5", "openui5", "javascript"]
keywords: ["sapui5", "openui5", "javascript", "dcode", "fiori", "SAP"]
description: "The slides from a talk i gave at SAP Dcode 2014, covers some of the best practices you may want to adopt when developing SAPUI5 apps for the enterprise"
---

{% speakerdeck 8086964076310132049b22819074b7b4 %}

Slides from the talk i gave at SAP Dcode 2014 Las Vegas

The talk was around using best practices to overcome some of the challenges you will face developing and maintaining SAPUI5 applications for the Enterprise.

The takeaways

**1. Follow JS Best Practices** - dont just stick to Eclipse, build a ft for purpose developer workflow, this includes automating develop, build and deploy tasks using Grunt or Gulp, using a distributed version control system like git to reduce the risk of introducing errors and ensuring quality, following best practices to improve the performance of your apps

**2. Dont Build Big Apps** - this is true for any programming paradigm, dont build big apps, build lots of small ones, in this section i covered the different techniques available for modularizing you code in small units and how to wire them together using events

**3. Use fit-for-purposes API's** - the inside-out approach for creating services with Netweaver Gateway sounds like a good idea, take an existing BAPI and expose it. This approach lends itself to complexity, as you come accross business logic and functionality not available in the BAPI developers will often try and build this into the front end. In this section i talked about taking a model first approach, let the data drive the app not the other way around, flesh out the screens you have designed and build an infomation architecture from the screens, use this as a basis for a data model to build your services from, at this point you can create Mock Data which will allow the SAPUI5 developer in parallel and independent of the backend ABAP developers, using the MockData server makes it easy to create Unit and End-to-End tests allowing you to quickly find issues in the Data Model
