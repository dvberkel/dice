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

    var DiceBuilder = function(){
	var amount = 1;
	var sides = 6;

	this.amount = function(amount){
	    this.amount = amount;
	    return this;
	};

	this.sides = function(sides) {
	    this.sides = sides;
	    return this;
	};

	this.build = function(){
	    var dice = new Dice();
	    for (var index = 0; index < this.amount; index++) {
		dice.add({ sides : this.sides });
	    }
	    return dice;
	};
    }

    GURPS.Die = Die;
    GURPS.Dice = Dice;
    GURPS.DiceBuilder = DiceBuilder;
})(jQuery, _, Backbone, GURPS);