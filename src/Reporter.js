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

    var WebSqlStore = function(){
	var connection = GURPS.database.connection();

        this.store = function(sides, value){
            connection.transaction(function(tx){
                tx.executeSql(
                    "insert into results (timestamp, sides, value) values (?, ?, ?)",
                    [(new Date()).getTime(), sides, value]
                );
            });
        };
    };

    GURPS.Reporter = Reporter;
    GURPS.WebSqlStore = WebSqlStore;
})(_, GURPS);
