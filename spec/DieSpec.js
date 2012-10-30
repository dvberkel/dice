describe("A Die", function(){
    it("should have default number of sides", function(){
        var die = new GURPS.Die();
        
        var sides = die.sides();
        
        expect(sides).toBe(6);
    });
    
    it("should signal a value between 1 and number of sides (inclusive) when cast", function(){
	var value = undefined;
        var die = new GURPS.Die({ sides : 3 });
	die.on("cast", function(result){
	    value = result;
	});
        
        die.cast();
        
        expect(value).toBeGreaterThan(0);
        expect(value).toBeLessThan(die.sides() + 1);
    });
});