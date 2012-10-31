(function($, PEG, GURPS){
    var error = "GURPS.Parser did not load properly";
    
    GURPS.Parser = {
        parse :  function(){
            throw error;
        }
    };
    
    $.ajax({
        url : "grammar/die.peg",
        success : function(data){
            GURPS.Parser = PEG.buildParser(data);
        },
        error : function(){
            console.log(error);
        }
    });
})(jQuery, PEG, GURPS);