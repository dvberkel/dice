(function(PEG, GURPS){
    var representation = "start = die\n";
    representation += "die = amount:number 'd' sides:number { return (new GURPS.DiceBuilder()).amount(amount).sides(sides).build();}\n";
    representation += "number = digits:[0-9]+ { return parseInt(digits.join(''), 10); }";

    var Parser = PEG.buildParser(representation);
    
    GURPS.Parser = Parser;    
})(PEG, GURPS);