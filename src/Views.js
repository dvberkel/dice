(function($, _, Backbone, GURPS){
    var MainView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $body = $('body');
 	    new DescriptionView({ model : this.model, el : $body });
 	    new ThrowView({ model : this.model, el : $body });
	}
    });

    var DescriptionView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $input = this.input();
	    $input.attr("value", this.model.get("description"));
	    $input.removeClass();
	    $input.addClass(this.model.isValid() ? "valid" : "invalid");
	},

	input : function(){
	    if (! this._input) {
		var $input = $("<input type='text'/>");
		$input.appendTo(this.$el);
		this._input = $input;
	    }
	    return this._input;
	}
    });

    var ThrowView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $button = this.button();
	    $button.removeClass();
	    $button.addClass(this.model.isValid() ? "valid" : "invalid");
	},

	button : function(){
	    if (! this._button) {
		var $button = $("<button>Throw</button>");
		$button.click(function(){
		    console.log("clicked");
		});
		$button.appendTo(this.$el);
		this._button = $button;
	    }
	    return this._button;
	}
    });

    GURPS.MainView = MainView;
})($, _, Backbone, GURPS);