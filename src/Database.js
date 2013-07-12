(function(GURPS){
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

    GURPS.database = {
        'connection' : function(){
            return db;
        }
    };
})(GURPS);
