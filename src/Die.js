(function($, _, Backbone, GURPS){
    var Die = Backbone.Model.extend({
        defaults : { sides : 6, random : Math.random },
        
        sides : function(){
            return this.get("sides");
        },
        
        cast : function(){
	    this.trigger("cast", Math.floor((this.get("random")() * this.sides()) + 1));
        }
    });

    GURPS.Die = Die;    
})(jQuery, _, Backbone, GURPS);