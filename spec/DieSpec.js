describe("A Die", function(){
    it("should have default number of sides", function(){
        var die = new GURPS.Die();

        var sides = die.sides();

        expect(sides).toBe(6);
    });

    it("should return a value between 1 and number of sides (inclusive) when cast", function(){
        var die = new GURPS.Die({ sides : 3 });

        var value = die.cast();

        expect(value).toBeBetween(1, 3);
    });

    it("should signal a value between 1 and number of sides (inclusive) when cast", function(){
        var value;
        var die = new GURPS.Die({ sides : 3 });
        die.on("cast", function(result){

            value = result;
        });

        die.cast();

        expect(value).toBeBetween(1, 3);
    });
});

describe("Dice", function(){
    it("should hold a number of die values", function(){
        var dice = new GURPS.Dice();

        dice.add(new GURPS.Die());

        expect(dice.size()).toBe(1);
    });

    it("should be able to be cast", function(){
        var dice = new GURPS.Dice();
        dice.add(new GURPS.Die());

        var value = dice.cast();

        expect(value).toBeBetween(1, 6);
    });

    it("should be create with a factory", function(){
        var builder = new GURPS.DiceBuilder();
        var dice = builder.amount(2).sides(6).build();

        var value = dice.cast();

        expect(value).toBeBetween(2, 12);
    });
});

describe("Dice Value", function(){
    it("should have sensible default values", function(){
        var diceValue = new GURPS.DiceValue();

        var value = diceValue.cast();

        expect(value).toBeBetween(1,6);
    });

    it("should also trigger a cast", function(){
        var value;
        var diceValue = new GURPS.DiceValue();
        diceValue.on("cast", function(result){
            value = result;
        });

        diceValue.cast();

        expect(value).toBeBetween(1,6);
    });

    it("should be able to multiply with a given range", function(){
        var diceValue  = (new GURPS.DiceValue()).multiply(10);

        var value = diceValue.cast();

        expect(value).toBeBetween(10, 60);
    });

    it("should be able to be shifted with a basis", function(){
        var diceValue = (new GURPS.DiceValue()).basis(3);

        var value = diceValue.cast();

        expect(value).toBeBetween(3, 9);
    });
});
