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
        var db = openDatabase("gurps_dice", "1.0", "results of dice throws", 5 * 1024 * 1024);

        db.transaction(function(tx){
            tx.executeSql("create table if not exists versions (timestamp, version)");
            tx.executeSql("create table if not exists results (timestamp, sides, value)");
        });

        db.transaction(function(tx){
            tx.executeSql("select version from versions order by version desc", [], function(rtx, result){
                var n = result.rows.length;
                if (n === 0) {
                    tx.executeSql(
                        "insert into versions (timestamp, version) values (?, ?)",
                        [(new Date()).getTime(), "1.0"]
                    );
                }
            });
        });

        this.store = function(sides, value){
            db.transaction(function(tx){
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
