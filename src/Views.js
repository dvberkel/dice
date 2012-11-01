(function($, _, Backbone, GURPS){
    var MainView = Backbone.View.extend({
	initialize : function(){
	    this.render();
	},
	
	render : function(){
	    var $body = $('body');
 	    new DescriptionView({ model : this.model, el : $body });
	}
    });

    var DescriptionView = Backbone.View.extend({
	template : _.template("<input type='text'/>"),

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
		var $input = $(this.template());
		$input.appendTo(this.$el);
		this._input = $input;
	    }
	    return this._input;
	}
    });

    GURPS.MainView = MainView;
})($, _, Backbone, GURPS);