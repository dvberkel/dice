(function($, GURPS){
    var description = new GURPS.Description({
        reporter : new GURPS.Reporter({
            stores : [ new GURPS.WebSqlStore() ]
        })
    });
    $(function(){
        new GURPS.MainView({ model : description });
    });
})(jQuery, GURPS);
