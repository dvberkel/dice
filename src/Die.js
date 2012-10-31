(function($, _, Backbone, GURPS){
    var Die = Backbone.Model.extend({
        defaults : { sides : 6, random : Math.random },
        
        sides : function(){
            return this.get("sides");
        },
        
        cast : function(){
	    var result = Math.floor((this.get("random")() * this.sides()) + 1);
	    this.trigger("cast", result);
	    return result;
        }
    });

    var Dice = Backbone.Collection.extend({
	model : Die,

	cast : function(){
	    var result = 0;
	    this.each(function(die){
		result += die.cast();
	    });
	    return result;
	}
    });

    GURPS.Die = Die;
    GURPS.Dice = Dice;
})(jQuery, _, Backbone, GURPS);