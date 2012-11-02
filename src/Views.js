(function($, _, Backbone, GURPS){
    var MainView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $body = $('body');
 	    new DescriptionView({ model : this.model, el : $body });
 	    new ThrowView({ model : this.model, el : $body });
 	    new ResultView({ model : this.model, el : $body });
	}
    });

    var DescriptionView = Backbone.View.extend({
	initialize : function(){
	    this.model.on("change:description", this.render, this);
	    this.render();
	},
	
	render : function(){
	    var $input = this.input();
	    $input.attr("value", this.model.get("description"));
	    $input.removeClass();
	    $input.addClass(this.model.isValid() ? "valid" : "invalid");
	},

	input : function(){
	    var self = this;
	    if (! self._input) {
		var $input = $("<input id='description' type='text'/>");
		$input.keyup(function(){
		    self.model.set("description", $input.val());
		});
		$input.appendTo(self.$el);
		self._input = $input;
	    }
	    return self._input;
	}
    });

    var ThrowView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $button = this.button();
	    if (this.model.isValid()) {
		$button.removeAttr("disabled");
	    } else {
		$button.attr("disabled", "disabled");
	    }
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

    var ResultView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $span = this.span();
	    if (this.model.isValid()) {
		$span.show();
		$span.text(37);
	    } else {
		$span.hide();
	    }
	},

	span : function(){
	    if (! this._span) {
		var $span = $("<span>_</span>");
		$span.click(function(){
		    console.log("clicked");
		});
		$span.appendTo(this.$el);
		this._span = $span;
	    }
	    return this._span;
	}
    });

    GURPS.MainView = MainView;
})($, _, Backbone, GURPS);