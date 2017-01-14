jQuery.sap.require('sap.ui.generic.app.AppComponent');
jQuery.sap.require('sap.ui.core.util.MockServer');

//Create on the fly component based on configuration in smartApp.json
jQuery.sap.declare("my.Component");

var oUriParameters = jQuery.sap.getUriParameters();
var sApp = oUriParameters.get("app") || false;
var sProject = jQuery.sap.getUriParameters().get("project") || false;
var bResponder = oUriParameters.get("responderOn") === "true";
var sDemoApp = oUriParameters.get("demoApp") || "products";
var bRTA = oUriParameters.get("rta") || false;
var bMockLog = oUriParameters.get("mockLog") || false;

console.log("mockLog:" + bMockLog)

//new parameter for session storage
var bSessionStorage = jQuery.sap.getUriParameters().get("use-session-storage");
if (bSessionStorage) {
	window['use-session-storage'] = true;
}
if (!sApp) {
	switch (sDemoApp) {
		case "salesorderdepr":
			sApp = "sap.suite.prototype.salesorder";
			sProject = "./sample.application";
			break;
		case "sttaproducts":
			sApp = "STTA_MP";
			sProject = "./sample.stta.manage.products/webapp";
			break;
		case "products":
			sApp = "ManageProductsNS";
			sProject = "./sample.manage.products/webapp";
			break;
		case "salesorder":
			sApp = "SalesOrdersNS";
			sProject = "./sample.sales.orders/webapp";
			break;
		default:
			sApp = "ManageProductsNS";
			sProject = "./sample.manage.products/webapp";
			break;
	}
}


jQuery.sap.registerModulePath(sApp, sProject);
if (bResponder) {
	jQuery.getJSON(sProject + "/manifest.json", function(data) {
		var manifest = data;
		startMockServers(sProject, manifest);

		sap.ui.getCore().attachInit(function() {
			//Fake LREP
			jQuery.sap.require("sap.ui.fl.FakeLrepConnector");
			//Fake LREP Local Storage Patch
			jQuery.sap.require("sap.ui.rta.util.FakeLrepConnectorLocalStorage");
			jQuery.extend(sap.ui.fl.FakeLrepConnector.prototype, sap.ui.rta.util.FakeLrepConnectorLocalStorage);
			sap.ui.fl.FakeLrepConnector.enableFakeConnector("fakeLRep.json");
			start();
		});
	});
} else {
	start();
}

function start() {

	var oContainer = new sap.ui.core.ComponentContainer({
			name: sApp,
			height: "100%"
		}),
		oShell = new sap.m.Shell("Shell", {
			showLogout: false,
			appWidthLimited: false,
			app: oContainer,
			homeIcon: {
				'phone': 'img/57_iPhone_Desktop_Launch.png',
				'phone@2': 'img/114_iPhone-Retina_Web_Clip.png',
				'tablet': 'img/72_iPad_Desktop_Launch.png',
				'tablet@2': 'img/144_iPad_Retina_Web_Clip.png',
				'favicon': 'img/favicon.ico',
				'precomposed': false
			}
		});

	if (bRTA) {
		var oBox = new sap.m.VBox({
			items: [
				new sap.m.Toolbar({
					content: [
						new sap.m.Button({
							text: "Adapt UI",
							press: function(oEvent) {
								jQuery.sap.require("sap.ui.rta.RuntimeAuthoring");
								var oRta = new sap.ui.rta.RuntimeAuthoring({
									rootControl: oContainer.getComponentInstance()
										.getAggregation('rootControl')
								});
								oRta.start();
							}
						}),
						new sap.m.Button({
							text: "Reset",
							press: function(oEvent) {
								sap.ui.rta.util.FakeLrepConnectorLocalStorage.deleteChanges();
								location.reload();
							}
						})
					]
				}),
				oShell
			]
		}).placeAt('content');
	} else {
		oShell.placeAt('content');
	}
}

function makeCallbackFunction(path) {
	return function(oXHR) {
		oXHR.respondFile(200, {}, path);
	};
}

function startMockServers(appPath, manifest) {
	var iAutoRespond = (oUriParameters.get("serverDelay") || 1000),
		oMockServer, dataSource, sMockDataBaseUrl,
		oDataSources = manifest["sap.app"]["dataSources"],
		MockServer = sap.ui.core.util.MockServer;

	sap.ui.core.util.MockServer.config({
		autoRespond: true,
		autoRespondAfter: iAutoRespond
	});
	for (var property in oDataSources) {
		if (oDataSources.hasOwnProperty(property)) {
			dataSource = oDataSources[property];
			//do we have a mock url in the app descriptor
			if (dataSource.settings && dataSource.settings.localUri) {
				if (typeof dataSource.type === "undefined" || dataSource.type === "OData") {
					oMockServer = new MockServer({
						rootUri: dataSource.uri
					});
					sMockDataBaseUrl = dataSource.settings.localUri.split("/").slice(0, -1).join("/");
					oMockServer.simulate(appPath + "/" + dataSource.settings.localUri, {
						sMockdataBaseUrl: appPath + "/" + sMockDataBaseUrl,
						bGenerateMissingMockData: true
					});
				} else {
					oMockServer = new MockServer({
						requests: [{
							method: "GET",
							//TODO have MockServer fixed and pass just the URL!
							path: new RegExp(MockServer.prototype
								._escapeStringForRegExp(dataSource.uri)),
							response: makeCallbackFunction(appPath + "/" + dataSource.settings.localUri)
						}]
					});
				}
				oMockServer.start();
			}
		}
	}
}
