(function(PEG, GURPS){
    var Parser = PEG.buildParser("start = 'a'+");
    
    GURPS.Parser = Parser;    
})(PEG, GURPS);