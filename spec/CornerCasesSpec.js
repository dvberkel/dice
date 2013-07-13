/*global describe:false, it:false, expect:false, GURPS:false*/
describe("Corner cases for", function(){
    describe("a Die", function(){
        it("could have 1 side", function(){
            var die = new GURPS.Die({ sides : 1 });

            var value = die.cast();

            expect(value).toBeBetween(1, 1);
	});
    });

    describe("a Dice", function(){
        it("could hold a die with 1 side", function(){
            var dice = new GURPS.Dice();
            dice.add(new GURPS.Die({ sides : 1 }));

            var value = dice.cast();

            expect(value).toBeBetween(1, 1);
        });
    });


    describe("a DiceBuilder", function(){
        it("could build dice with 1 one-sided die", function(){
            var builder = new GURPS.DiceBuilder();
            var dice = builder.amount(1).sides(1).build();

            var value = dice.cast();

            expect(value).toBeBetween(1, 1);
        });
    });
});
