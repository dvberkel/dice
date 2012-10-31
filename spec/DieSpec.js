describe("A Die", function(){
    it("should have default number of sides", function(){
        var die = new GURPS.Die();
        
        var sides = die.sides();
        
        expect(sides).toBe(6);
    });
    
    it("should return a value between 1 and number of sides (inclusive) when cast", function(){
        var die = new GURPS.Die({ sides : 3 });

        var value = die.cast();
        
        expect(value).toBeGreaterThan(0);
        expect(value).toBeLessThan(die.sides() + 1);
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

describe("Dice", function(){
    it("should hold a number of die", function(){
	var dice = new GURPS.Dice();

	dice.add(new GURPS.Die());

	expect(dice.size()).toBe(1);
    });

    it("should be able to be cast", function(){
	var sides = 6
	var dice = new GURPS.Dice();
	dice.add(new GURPS.Die({ sides : sides }));

        var value = dice.cast();
        
        expect(value).toBeGreaterThan(0);
        expect(value).toBeLessThan(sides + 1);
    });
});