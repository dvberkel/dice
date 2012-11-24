(function(_, GURPS){
    var Reporter = function(options){
        var stores = options.stores || [];
            this.report = function(sides, value){
            _.each(stores, function(store){
                store.store(sides, value);
            });
        };

        this.monitor = function(die) {
            var self = this;
            die.on("cast", function(result){
                self.report(this.sides(), result);
            }, die);
        };
    };

    GURPS.Reporter = Reporter;
})(_, GURPS);
