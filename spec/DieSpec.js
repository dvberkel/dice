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
    
    it("should be able to multiply with a given range", function(){
        var die = (new GURPS.Die()).multiply(10);

        var value = die.cast();
        
        expect(value).toBeGreaterThan(10 * 1 - 1);
        expect(value).toBeLessThan(10 * die.sides() + 1);
    });

    it("should be able to be shifted with a basis", function(){
        var die = (new GURPS.Die()).basis(3);

        var value = die.cast();
        
        expect(value).toBeGreaterThan(3);
        expect(value).toBeLessThan(die.sides() + 1 + 3);
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

    it("should be create with a factory", function(){
	var builder = new GURPS.DiceBuilder();
	var dice = builder.amount(2).sides(6).build();

        var value = dice.cast();
        
        expect(value).toBeGreaterThan(1);
        expect(value).toBeLessThan(13);
    });
});
