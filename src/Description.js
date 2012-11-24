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
                this.monitor(dice);
            } catch(error) {
                this.unset("dice");
            }
        },

        monitor : function(dice) {
            if (this.has("reporter")) {
                var reporter = this.get("reporter");
                dice.get("dice").each(function(die){
                    reporter.monitor(die);
                });
            }
            this.set("dice", dice);
        },

        isValid : function(){
            return this.has("dice");
        },

        cast : function(){
            if (this.has('dice')) {
                this.trigger("cast", this.get("dice").cast());
            }
        }
    });

    GURPS.Description = Description;
})(_, Backbone, GURPS);
