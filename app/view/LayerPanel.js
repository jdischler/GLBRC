
var store = Ext.create('Ext.data.TreeStore', {
            
		root: {
				expanded: true,
				children: [{
						text: 'Land Coverage',
						expanded: true,
						children: [{
								text: 'Crops',
								leaf: true,
								checked: false
						},
						{		text: 'Forest',
								leaf: true,
								checked: false
						},
						{		text: 'Wetlands',
								leaf: true,
								checked: false
						},
						{		text: 'Urban',
								leaf: true,
								checked: false
						}]
				},
				{
						text: 'Geophysical',
						expanded: true,
						children: [{
								text: 'Elevation',
								leaf: true,
								checked: false
						},
						{		text: 'Slope',
								leaf: true,
								checked: false
						},
						{		text: 'Rivers',
								leaf: true,
								checked: false
						},
						{ 	text: 'Roads',
								leaf: true,
								checked: false
						}]
				},
				{
						text: 'Biophysical',
						expanded: true,
						children: [{
								text: 'Soil',
								leaf: true,
								checked: false
						}]
				},
				{
						text: 'Economic',
						expanded: true,
						children: [{
								text: 'Marginal Land',
								leaf: true,
								checked: false
						}]
				}]
		}
});

Ext.define('MyApp.view.LayerPanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.layerPanel',

    title: 'Layers',
    titleAlign: 'center',
    store: store,
    minHeight: 400,
    maxHeight: 700,

    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'container',
                            height: 125,
                            maxHeight: 125,
                            minHeight: 125,
                            width: 400,
                            layout: {
                                type: 'absolute'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    x: 20,
                                    y: 8,
                                    height: 90,
                                    width: 120,
                                    columns: 1,
                                    vertical: true,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Is'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Is Not'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Is Not'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Is Not'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            boxLabel: 'Is Not'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
