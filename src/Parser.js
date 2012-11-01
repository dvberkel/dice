(function($, PEG, GURPS){
    var error = "GURPS.Parser did not load properly";
    
    GURPS.Parser = {
        parse :  function(){
            throw error;
        }
    };
    
    $.ajax({
        url : "grammar/die.peg",
	dataType: "text",
        success : function(data, textStatus, jqXHR){
            GURPS.Parser = PEG.buildParser(data);
        },
        error : function(){
            console.log(error);
        }
    });
})(jQuery, PEG, GURPS);
