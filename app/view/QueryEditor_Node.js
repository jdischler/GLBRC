Ext.define('MyApp.view.QueryEditor_Node', {
    alias: 'widget.queryEd_node',
    
    mouseOverClickedFill: '#FC6',
    mouseOverFill: '#FA2',
    clickedFill: '#FB4',
    normalFill: '#F70',
    
    mouseOverClickedStroke: '#FF6',
    mouseOverStroke: '#330',
    clickdStroke: '#FF0',
    normalStroke: '#000',
    
    attach: function(surface, atX, atY) {
			
    	this.clickedState = false;
			this.nodeSprite = surface.add({
					type: 'rect',
					x: atX,
					y: atY,
					width: 100,
					height: 30,
					radius: 15,
					fill: this.normalFill,
					stroke: this.normalStroke,
					'stroke-width': 2,
					listeners: {
							mouseover: this.onMouseOver,
							mouseout: this.onMouseOut,
							click: this.onClick,
							scope: this // Important. Ensure "this" is correct during handler execution
					}
			});
			
			this.nodeSprite.show(true);
		},
    
		onMouseOver: function(node) {
    	var fill = this.mouseOverFill;
    	var stroke = this.mouseOverStroke;
    	if (node.clickedState) {
    			fill = this.mouseOverClickedFill;
    			stroke = this.mouseOverClickedStroke;
    	}
    	node.stopAnimation().animate({
    			duration: 150,
    			to: {
    				fill: fill,
    				stroke: stroke
    			}
    	});
    },
    
    onMouseOut: function(node) {
    	var fill = this.normalFill;
    	var stroke = this.normalStroke;
    	if (node.clickedState) {
    			fill = this.clickedFill;
    			stroke = this.clickedStroke;
    	}
    	node.stopAnimation().animate({
    			duration: 150,
    			to: {
    				fill: fill,
    				stroke: stroke
    			}
    	});
    },
    
    onClick: function(node) {
    	node.clickedState = !node.clickedState;
    	
    	var fill = this.mouseOverFill;
    	var stroke = this.mouseOverStroke;
    	if (node.clickedState) {
    			fill = this.mouseOverClickedFill;
    			stroke = this.mouseOverClickedStroke;
    	}
    	
    	node.stopAnimation().animate({
    			duration: 150,
    			easing: 'easeOut',
    			from: {
    				scale: {
    					x: 1.1,
    					y: 1.1
    				}
    			},
    			to: {
    				fill: fill,
    				stroke: stroke,
    				scale: {
    					x: 1,
    					y: 1
    				}
    			}
    	});
    }

  
});

