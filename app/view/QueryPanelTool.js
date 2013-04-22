Ext.define('MyApp.view.QueryPanelTool', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.querypanel',

    layout: {
        type: 'absolute'
    },
    height: 120,
    title: 'Select Landscape Characteristics',
	icon: 'app/images/query_layer_icon.png',

    tools:[{
		type: 'help',
		qtip: 'Query Help',
		handler: function(event, target, owner, tool) {
			var help = Ext.create('MyApp.view.LayerHelpWindow').show();
		}
    }],
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    x: 290,
                    y: 50,
                    scale: 'medium',
                    text: 'Add to Query'
                },
                {
                    xtype: 'radiogroup',
                    x: 0,
                    y: 10,
                    height: 30,
                    width: 180,
                    fieldLabel: 'Range',
                    labelAlign: 'right',
                    labelWidth: 50,
                    columns: 1,
                    vertical: true,
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: 'Is less than:'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'Is within:'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'Is greater than:'
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    x: 180,
                    y: 10,
                    width: 70,
                    fieldLabel: 'Label',
                    hideLabel: true
                },
                {
                    xtype: 'numberfield',
                    x: 260,
                    y: 10,
                    width: 70,
                    fieldLabel: 'Label',
                    hideLabel: true
                }
            ]
        });

        me.callParent(arguments);
    }

});
