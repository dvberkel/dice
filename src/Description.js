(function(_, Backbone, GURPS){
    var Description = Backbone.Model.extend({
	defaults : { description : "3d6" },

	initialize : function(){
	    this.on("change:description", this.process, this);
	    this.process();
	},

	process : function(){
	    try {
		var dice = GURPS.Parser.parse(this.get("description"));
		this.set("dice", dice);
	    } catch(error) {
		this.unset("dice");
	    }
	},

	isValid : function(){
	    return this.has("dice");
	}
    });

    GURPS.Description = Description;
})(_, Backbone, GURPS);