/*
 * File: app/view/ManagementTools.js
 * Date: Tue Dec 04 2012 09:59:26 GMT-0600 (CST)
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.ManagementTools', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.managementtools',

    height: 200,
    width: 300,
    title: 'Management Tools',
    titleAlign: 'center',
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'Management',
                    items: [
                        {
                            xtype: 'combobox',
                            store: 'store1'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: 'Properties'
                }
            ]
        });

        me.callParent(arguments);
    }

});