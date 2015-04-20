---
layout: post
title: "Promise Polyfill"
date: 2015-03-10 18:03
comments: true
categories: 
keywords: sapui5, jQuery, promise
description: A simple jQuery polyfill for jQuery
---

This is a quick blog to remind myself how to support ES6 Promise's in older versions of SAPUI5. I was developing a UI5 app for a customer with Chrome, Chrome already supports natively some of the ECMA Script 6 features like Promises and it was only when i ran the applcations Opa Tests against Internet Explorer and PhantomJS I found out that I had a couple of backwards compatibility issues which required me to add polyfills.

**What is a Promise?**

[A promise represents the result of an asynchronous operation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). In JavaScript its a nice clean way of avoiding nested callbacks.

For example a promise could represent a list being loaded and onload you want to trigger some functionality say update the list title with the count of entries

<pre class="language-javascript"><code>oWhenListLoadingIsDone = new Promise(function(fnResolve, fnReject) {
	// trigger resolve callback when list finished loading
	oMasterList.attachEventOnce("updateFinished", function(){ fnResolve()
	..
}
</code></pre>

<pre class="language-javascript">
oWhenListLoadingIsDone.then(setListTitle, errorCB)
</code></pre>

**What is a Polyfill?**

[A polyfill, is a piece of code that provides the technology that youexpect the browser to provide natively](https://remysharp.com/2010/10/08/what-is-a-polyfill). 

SAPUI5 is built on jQuery and jQuery has thier own version of Promise, however thier API breaks the native Promise in a couple of ways. 

In my case to get Internet Explorer to support the `new Promise(function(fnResolve, fnReject)` syntax I had been using was quite simple.

<pre class="language-javascript"><code>if (!window.Promise) {
    window.Promise = function(callBack) {
        var promise = jQuery.Deferred();

        callBack(promise.resolve, promise.reject);

        return promise.promise();
    };
}
</code></pre>

The current version of UI5 has an ECMA Script 6 Polyfill [`jQuery.sap.promise`](https://github.com/SAP/openui5/blob/master/src/sap.ui.core/src/jquery.sap.promise.js) this version is a lot more complete than the one i mention above.