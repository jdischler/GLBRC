// * File: app/view/MainViewport.js

var globalMap;
var bufferSize = 2; // how many non-visible tiles on either side of visible area to cache?
var imgFormat = 'image/png';
var baseUrl = 'pgis.glbrc.org';
var baseUrl1 = 'pgis1.wei.wisc.edu';
var baseUrl2 = 'pgis2.wei.wisc.edu';
var baseUrl3 = 'pgis3.wei.wisc.edu';
var path = "/geoserver/DSS-Vector/wms";
var port = '8080';
var resizeMethod = null; // "resize";

//------------------------------------------------------------------------------
Ext.define('MyApp.view.MainViewport', {
//------------------------------------------------------------------------------

	extend: 'Ext.container.Viewport',
	requires: [
		'MyApp.view.InfoToolbar',
		'MyApp.view.MainToolbar',
		'MyApp.view.QueryEditor',
		'MyApp.view.ViewTools',
		'MyApp.view.SelectionTools',
		'MyApp.view.TransformationTools',
		'MyApp.view.ManagementTools',
		'MyApp.view.EvaluationTools',
		'MyApp.view.GraphTools',
		'GeoExt.panel.Map',
		'MyApp.view.LayerPanel',
		'MyApp.view.ScenarioTools',
		'MyApp.view.GlobalScenarioTools',
		'MyApp.view.QueryPanelTool',
		'MyApp.view.ReportTools'
	],
	
	//minHeight: 400,
	//minWidth: 800,
	
	autoScroll: true,
	layout: {
		type: 'fit'
	},

	//--------------------------------------------------------------------------
	initComponent: function() {
		
		var me = this;
		var projectionType = 'EPSG:3174';
		var bounds = new OpenLayers.Bounds(
			473145.000100002, 2201985.0001,
			587505.000100002, 2297115.0001
		);
/*		bounds = new OpenLayers.Bounds(
			557015.3576368737, 703428.1584157696,
			632284.8057406195, 763708.4957687574
		);
*/
		var options = {
			controls: [],
			maxExtent: bounds,
			maxResolution: 446.7187500000002,
			projection: projectionType,
			units: 'm'
		};
		
		globalMap = new OpenLayers.Map('map', options)
		var map = globalMap;

		this.doApplyIf(me, map);
		
//		map.zoomToExtent(bounds.scale(0.1));
		me.callParent(arguments);
		this.addMapLayers(map, baseUrl, port, path);
		this.addMapControls(map);		
		map.zoomTo(2);
	},
    
	//--------------------------------------------------------------------------
	addMapControls: function(map) {
		
		var layerBrowser = Ext.getCmp('mapLayerPanel');

		map.addControl(new OpenLayers.Control.Navigation({
			documentDrag: true, 
			dragPanOptions: {
				enableKinetic: true,
				kineticInterval: 500
			}
		}));
		
		var overviewMap = new OpenLayers.Control.OverviewMap({minRatio: 32, maxRatio:64, autoPan:true}); 
		map.addControl(overviewMap);
		overviewMap.maximizeControl();
		
		map.addControl(new OpenLayers.Control.PanZoomBar({zoomWorldIcon: true}));
		map.addControl(new OpenLayers.Control.ArgParser());
		map.addControl(new OpenLayers.Control.Attribution());
		
		var layerSwitcher =new OpenLayers.Control.LayerSwitcher(); 
		map.addControl(layerSwitcher);
	//	layerSwitcher.maximizeControl();
		
		var scaleLine = new OpenLayers.Control.ScaleLine({maxWidth: 200,         					
			lineSymbolizer: {
				strokeColor: "#bbb",
				strokeWidth: 1,
				strokeOpacity: 0.7
			},
			labelSymbolizer: {
				fontColor: '#bbb',
				labelXOffset: "0",
				labelYOffset: "2",
				labelOutlineColor: "black",
				labelOutlineWidth: 4
			}
		}); 
		map.addControl(scaleLine);
		
		var lonlatGrid = new OpenLayers.Control.Graticule({
			displayInLayerSwitcher: true, 
			visible: false, 
			targetSize: 500,
			numPoints: 8,
			lineSymbolizer: {
				strokeColor: "#777",
				strokeWidth: 1,
				strokeOpacity: 0.8
			},
			labelSymbolizer: {
				fontColor: '#ddd',
				labelXOffset: "0",
				labelYOffset: "2",
				labelOutlineColor: "#222",
				labelOutlineWidth: 4
			}
		})
		map.addControl(lonlatGrid);
		lonlatGrid.draw();
		lonlatGrid.gratLayer.name = 'Lon/Lat Grid';
		layerBrowser.addLayer(lonlatGrid.gratLayer, 'Tools','app/images/tool.png',
				'Activate the longitude/latitude grid overlay');
	},
				
	//--------------------------------------------------------------------------
	addMapLayers: function(map, baseUrl, port, path) {
		
		var layerBrowser = Ext.getCmp('mapLayerPanel');
		
		//----------------
		var wmsDane = new OpenLayers.Layer.WMS("Dane County", 
			["http://" + baseUrl + ":" + port + path,
			"http://" + baseUrl1 + ":" + port + path,
			"http://" + baseUrl2 + ":" + port + path,
			"http://" + baseUrl3 + ":" + port + path],
			{
				layers: 'DSS-Vector:dane_county',
				transparent: true,
				format: imgFormat
			},
			{ 
				displayOutsideMapExtent: false,
				opacity: 0.5,
				isBaseLayer: false,
				transitionEffect: resizeMethod,
				buffer: bufferSize,
				visibility: false
			});
		
		//----------------
		var wmsWatersheds = new OpenLayers.Layer.WMS("Watersheds", 
			["http://" + baseUrl + ":" + port + path,
			"http://" + baseUrl1 + ":" + port + path,
			"http://" + baseUrl2 + ":" + port + path,
			"http://" + baseUrl3 + ":" + port + path],
			{
				layers: 'DSS-Vector:watersheds',
				transparent: true,
				format: imgFormat
			},
			{ 
				displayOutsideMapExtent: false,
				opacity: 0.5,
				isBaseLayer: false,
				transitionEffect: resizeMethod,
				buffer: bufferSize,
				visibility: false
			});
		
		//----------------
		var wmsRoads = new OpenLayers.Layer.WMS("Roads", 
			["http://" + baseUrl + ":" + port + path,
			"http://" + baseUrl1 + ":" + port + path,
			"http://" + baseUrl2 + ":" + port + path,
			"http://" + baseUrl3 + ":" + port + path],
			{ 
				layers: 'DSS-Vector:roads',  
				transparent: "true",
				format: imgFormat  
			},
			{ 
				displayOutsideMapExtent: false,
				isBaseLayer: false,
				opacity: 0.5,
				transitionEffect: resizeMethod,
				visibility: false
			});
		
		//----------------
		var wmsRivers = new OpenLayers.Layer.WMS("Rivers", 
			["http://" + baseUrl + ":" + port + path,
			"http://" + baseUrl1 + ":" + port + path,
			"http://" + baseUrl2 + ":" + port + path,
			"http://" + baseUrl3 + ":" + port + path],
			{ 
				layers: 'DSS-Vector:rivers',  
				transparent: "true",
				format: imgFormat  
			},
			{ 
				displayOutsideMapExtent: false,
				isBaseLayer: false,
				opacity: 0.3,
				transitionEffect: resizeMethod,
				visibility: false
			});
		
		//----------------
		var wmsLand = new OpenLayers.Layer.WMS("Public Land", 
			["http://" + baseUrl + ":" + port + path,
			"http://" + baseUrl1 + ":" + port + path,
			"http://" + baseUrl2 + ":" + port + path,
			"http://" + baseUrl3 + ":" + port + path],
			{ 
				layers: 'DSS-Vector:public_land',  
				transparent: "true",
				format: imgFormat 
			},
			{ 
				displayOutsideMapExtent: false,
				opacity: 0.3,
				isBaseLayer: false,
				transitionEffect: resizeMethod,
				visibility: false
			});
		
		//----------------
		var wmsSlope = new OpenLayers.Layer.WMS("Slope", 
			["http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl1 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl2 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl3 + ":" + port + "/geoserver/DSS-Raster/wms"],
			{
				layers: 'DSS-Raster:Slope',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: false,
				isBaseLayer: false,
				opacity: 0.5,
				transitionEffect: resizeMethod,
				visibility: false,
				yx : {
					projectionType : true
				}
			});

		//----------------
		var wmsDEM = new OpenLayers.Layer.WMS("Digital Elevation", 
			["http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl1 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl2 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl3 + ":" + port + "/geoserver/DSS-Raster/wms"],
			{
				layers: 'DSS-Raster:DEM',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: false,
				isBaseLayer: false,
				transitionEffect: resizeMethod,
				opacity: 0.5,
				visibility: false,
				yx : {
					projectionType : true
				}
			});
		
		//----------------
		var wmsCDL = new OpenLayers.Layer.WMS("CDL", 
			["http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl1 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl2 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl3 + ":" + port + "/geoserver/DSS-Raster/wms"],
			{
				layers: 'DSS-Raster:CDL',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: false,
				opacity: 1,
				isBaseLayer: true,
				transitionEffect: resizeMethod,
				yx : {
					projectionType : true
				}
			});

		var wmsAerial = new OpenLayers.Layer.WMS("Aerial",
			["http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl1 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl2 + ":" + port + "/geoserver/DSS-Raster/wms",
			"http://" + baseUrl3 + ":" + port + "/geoserver/DSS-Raster/wms"],
			{
				LAYERS: 'DSS-Raster:Aerial_Photo',
				format: imgFormat,
//				tiled: true,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: false,
				transitionEffect: 'resize',
				isBaseLayer: true,
				yx : {
					projectionType : true
				}
			});
		
		//----------------
/*		layerBrowser.addLayer(wmsAerial, 'Aerial','app/images/raster.png',
				'Activate a raster overlay of land usage');
*/
		layerBrowser.addLayer(wmsCDL, 'Land Coverage','app/images/raster.png',
				'Activate a raster overlay of land usage');
		layerBrowser.addLayer(wmsDEM, 'Geophysical','app/images/raster.png',
				'Activate a raster overlay of elevation');
		layerBrowser.addLayer(wmsSlope, 'Geophysical','app/images/raster.png',
				'Activate a raster overlay of calculated terrain slope');
		layerBrowser.addLayer(wmsRivers, 'Geophysical','app/images/vector.png',
				'Activate a vector overlay of all rivers');
		layerBrowser.addLayer(wmsRoads, 'Geophysical','app/images/vector.png',
				'Activate a vector overlay of all roads');
		layerBrowser.addLayer(wmsWatersheds, 'Geophysical','app/images/vector.png',
				'Activate a vector overlay of the watersheds');
		layerBrowser.addLayer(wmsLand, 'Geophysical','app/images/vector.png',
				'Activate a vector overlay of publicly owned lands');
		layerBrowser.addLayer(wmsDane, 'Geophysical','app/images/vector.png',
				'Activate a vector overlay of Dane County');
	
		map.addLayers([/*wmsAerial,*/wmsCDL,wmsDEM,wmsSlope,wmsDane,wmsWatersheds,wmsRivers,wmsRoads,wmsLand]);
	},
	
	//--------------------------------------------------------------------------
    doApplyIf: function(me, map) {
    	
        Ext.applyIf(me, {
			items: [{
				xtype: 'panel',
				minHeight: 400,
				minWidth: 800,
				autoScroll: true,
				layout: {
					type: 'fit'
				},
				items: [{
					xtype: 'gx_mappanel',
					title: 'Landscape Viewer',
					icon: 'app/images/globe_icon.png',
//					titleAlign: 'center',
					map: map,
					border: 0,
					center: '12,51',
					zoom: 6,
					stateId: 'mappanel',
				}],
				dockedItems: [{
					xtype: 'panel',
					frame: false,
					layout: {
						type: 'absolute'
					},
//					title: 'GLBRC Decision Support Tool v0.1',
//					titleAlign: 'center',
					header: false,
					dock: 'top',
					collapsible: true,
					animCollapse: false,
					collapsed: false,
					height: 64,
					bodyStyle: 'background-color:rgb(220,230,240)',
					items: [{
						xtype: 'image',
						x: 0,
						y: 0,
						src: 'app/images/dss_logo.png'
					}]
				},
				{
					xtype: 'queryEditor',
					dock: 'top',
					collapsed: true
				},
				{
					xtype: 'infotoolbar',
					dock: 'bottom'
				},
				{
					xtype: 'panel',
					dock: 'left',
					width: 400,
					autoScroll: true,
					layout: {
						fill: false,
						autoWidth: false,
						type: 'accordion',
						animate: false,
						multi: true
					},
					collapseDirection: 'left',
					collapsible: true,
					frameHeader: false,
					manageHeight: false,
					title: '',

					listeners: {
						collapse: function(p, eOpts) { 
							p.setTitle('Query / Scenario Tools');
						},
						beforeexpand: function(p, animated, eOpts) {
							p.setTitle('');
						},
					},
					items: [{
						xtype: 'layerPanel'
					},
					{
						xtype: 'querypanel'
					},
					{
						xtype: 'scenariotools',
						collapsed: true
					},
					{
						xtype: 'transformationtools',
						collapsed: true
					},
					{
						xtype: 'globalscenariotools',
						collapsed: true
					}]
				},
				{
					xtype: 'panel',
					dock: 'right',
					width: 400,
					autoScroll: true,
					layout: {
						fill: false,
						autoWidth: false,
						type: 'accordion',
						animate: false,
						multi: true
					},
					collapseDirection: 'right',
					collapsible: true,
					collapsed: true,
					items: [{
						xtype: 'evaluationtools'
					},
					{
						xtype: 'reporttools',
						collapsed: true
					}]
				}]
			}]
        });
    }

});