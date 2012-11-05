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
        var _amount = 1;
        var _sides = 6;

        this.amount = function(amount){
            _amount = amount;
            return this;
        };

        this.sides = function(sides) {
            _sides = sides;
            return this;
        };

        this.build = function(){
            var dice = new Dice();
            for (var index = 0; index < _amount; index++) {
                dice.add({ die : new Die({ sides : _sides }) });
            }
            return dice;
        };
    };

    var DiceValue = Backbone.Model.extend({
        defaults : { multiplier : 1, basis : 0 },

        initialize : function(){
            if (!this.has("dice")) {
                var dice = new DiceBuilder().amount(1).sides(6).build();
                this.set("dice", dice);
            }
        },

        multiply : function(multiplier){
            this.set("multiplier", multiplier);

            return this;
        },

        basis : function(basis){
            this.set("basis", basis);

            return this;
        },

        cast : function(){
            var face = this.get("dice").cast();
            var result = this.get("multiplier") * face + this.get("basis");
            this.trigger("cast", result);
            return result;

        }
    });

    GURPS.Die = Die;
    GURPS.Dice = Dice;
    GURPS.DiceBuilder = DiceBuilder;
    GURPS.DiceValue = DiceValue;
})(jQuery, _, Backbone, GURPS);
