// * File: app/view/MainViewport.js

var globalMap;
var bufferSize = 2; // how many non-visible tiles on either side of visible area to cache?
var imgFormat = 'image/png';
var baseUrl = 'pgis.glbrc.org';
var path = "/geoserver/AfriDSSV/wms";
var port = '8080';

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
		'MyApp.view.LayerPanel'
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
		var options = {
			controls: [],
			maxExtent: bounds,
			maxResolution: 446.7187500000002,
			projection: projectionType,
			units: 'm'
		};
		
		globalMap = new OpenLayers.Map('map', options)
		var map = globalMap;

		this.addMapLayers(map, baseUrl, port, path);
		this.addMapControls(map);		
		this.doApplyIf(me, map);
		map.zoomTo(2);
		
//		map.zoomToExtent(bounds.scale(0.1));
		me.callParent(arguments);
	},
    
	//--------------------------------------------------------------------------
	addMapControls: function(map) {
		
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
		layerSwitcher.maximizeControl();
		
		map.addControl(new OpenLayers.Control.ScaleLine({maxWidth: 200,         					
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
		}));
		map.addControl(new OpenLayers.Control.Graticule({
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
		}));
	},
	
	//--------------------------------------------------------------------------
	addMapLayers: function(map, baseUrl, port, path) {
		
		var wmsDane = new OpenLayers.Layer.WMS("Dane County", 
			"http://" + baseUrl + ":" + port + path,
			{
				layers: 'AfriDSSV:dane_county',
				transparent: true,
				format: imgFormat
			},
			{ 
				displayOutsideMapExtent: true,
				opacity: 0.5,
				isBaseLayer: false,
				transitionEffect: 'resize',
				buffer: bufferSize,
				visibility: false
			});
		var wmsWatersheds = new OpenLayers.Layer.WMS("Watersheds", 
			"http://" + baseUrl + ":" + port + path,
			{
				layers: 'AfriDSSV:watersheds',
				transparent: true,
				format: imgFormat
			},
			{ 
				displayOutsideMapExtent: true,
				opacity: 0.5,
				isBaseLayer: false,
				transitionEffect: 'resize',
				buffer: bufferSize,
				visibility: false
			});
		var wmsRoads = new OpenLayers.Layer.WMS("Roads", 
			"http://" + baseUrl + ":" + port + path,
			{ 
				layers: 'AfriDSSV:roads',  
				transparent: "true",
				format: imgFormat  
			},
			{ 
				displayOutsideMapExtent: true,
				opacity: 1,
				isBaseLayer: false,
				opacity: 0.5,
				transitionEffect: 'resize',
				buffer: bufferSize,
				visibility: false
			});
		var wmsRivers = new OpenLayers.Layer.WMS("Rivers", 
			"http://" + baseUrl + ":" + port + path,
			{ 
				layers: 'AfriDSSV:rivers',  
				transparent: "true",
				format: imgFormat  
			},
			{ 
				displayOutsideMapExtent: true,
				opacity: 1,
				isBaseLayer: false,
				opacity: 0.3,
				transitionEffect: 'resize',
				buffer: bufferSize,
				visibility: false
			});
		var wmsLand = new OpenLayers.Layer.WMS("Public Land", 
			"http://" + baseUrl + ":" + port + path,
			{ 
				layers: 'AfriDSSV:public_land',  
				transparent: "true",
				format: imgFormat 
			},
			{ 
				displayOutsideMapExtent: true,
				opacity: 0.3,
				isBaseLayer: false,
				transitionEffect: 'resize',
				buffer: bufferSize,
				visibility: false
			});
		var wmsSlope = new OpenLayers.Layer.WMS("Slope", 
			"http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			{
				layers: 'DSS-Raster:Slope',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: true,
				isBaseLayer: false,
				opacity: 0.5,
				transitionEffect: 'resize',
				buffer: bufferSize,
				yx : {
					projectionType : true
				}
			});
		var wmsDEM = new OpenLayers.Layer.WMS("DEM", 
			"http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			{
				layers: 'DSS-Raster:DEM',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: true,
				isBaseLayer: true,
				transitionEffect: 'resize',
				buffer: bufferSize,
				yx : {
					projectionType : true
				}
			});
		var wmsCDL = new OpenLayers.Layer.WMS("CDL", 
			"http://" + baseUrl + ":" + port + "/geoserver/DSS-Raster/wms",
			{
				layers: 'DSS-Raster:CDL',
				format: imgFormat,
				tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
			},
			{
				buffer: bufferSize,
				displayOutsideMaxExtent: true,
				isBaseLayer: true,
				transitionEffect: 'resize',
				buffer: bufferSize,
				yx : {
					projectionType : true
				}
			});
		
		map.addLayers([wmsCDL,wmsDEM,wmsSlope,wmsDane,wmsWatersheds,wmsRivers,wmsRoads,wmsLand]);
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
					titleAlign: 'center',
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
					title: 'GLBRC Decision Support Tool v0.1',
					titleAlign: 'center',
					dock: 'top',
					collapsible: true,
					animCollapse: false,
					collapsed: true,
					height: 90
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
							p.setTitle('Scenario Tools');
						},
						beforeexpand: function(p, animated, eOpts) {
							p.setTitle('');
						},
					},
					items: [{
						xtype: 'layerPanel'
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
					items: [{
						xtype: 'evaluationtools'
					}]
				}]
			}]
        });
    }

});