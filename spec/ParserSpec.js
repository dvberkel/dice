describe("A Parser", function(){
    it("should be defined", function(){
        expect(GURPS.Parser).toBeDefined();
    });

    it("should parse a expression '1d6'", function(){
        expect(function(){GURPS.Parser.parse("1d6")}).not.toThrow();
    });

    it("should return a Dice object", function(){
	var dice = GURPS.Parser.parse("2d6");
	console.log(dice);

	var value = dice.cast();

	expect(value).toBeGreaterThan(1);
	expect(value).toBeLessThan(13);
    });
});