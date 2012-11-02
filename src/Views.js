(function($, _, Backbone, GURPS){
    var MainView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $body = $('body');
 	    new DescriptionView({ model : this.model, el : $body });
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
		$input.keypress(function(e){
		    if (e.which == 13) self.model.cast();
		});
		$input.appendTo(self.$el);
		self._input = $input;
	    }
	    return self._input;
	}
    });

    var ResultView = Backbone.View.extend({
	options : { last : "_" },

	initialize : function(){
	    this.model.on("change:description", this.clear, this);
	    this.model.on("change:description", this.render, this);
	    this.model.on("cast", this.cast, this);
	    this.render();
	},

	clear : function(){
	    this.options.last = "_";
	},
	
	render : function(){
	    var $span = this.span();
	    if (this.model.isValid()) {
		$span.show();
		$span.text(this.options.last);
	    } else {
		$span.hide();
	    }
	},

	span : function(){
	    if (! this._span) {
		var $span = $("<span class='result'>_</span>");
		$span.click(function(){
		    console.log("clicked");
		});
		$span.appendTo(this.$el);
		this._span = $span;
	    }
	    return this._span;
	},

	cast : function(value) {
	    this.options.last = value;
	    this.render();
	}
    });

    GURPS.MainView = MainView;
})($, _, Backbone, GURPS);