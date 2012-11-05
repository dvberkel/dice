describe("A Parser", function(){
    it("should be defined", function(){
        expect(GURPS.Parser).toBeDefined();
    });

    it("should parse a expression '1d6'", function(){
        expect(function(){ GURPS.Parser.parse("1d6"); }).not.toThrow();
    });

    it("should return a castleable object", function(){
        var dice = GURPS.Parser.parse("2d6");

        var value = dice.cast();

        expect(value).toBeBetween(2,12);
    });

    it("should return a castleable object", function(){
        var dice = GURPS.Parser.parse("2d6");

        var value = dice.cast();

        expect(value).toBeBetween(2,12);
    });

    it("should return a multiplyable option", function(){
        var dice = GURPS.Parser.parse("10*1d6");

        var value = dice.cast();

        expect(value).toBeBetween(10,60);
    });

    it("should return a multiplyable value", function(){
        var dice = GURPS.Parser.parse("10*1d6");

        var value = dice.cast();

        expect(value).toBeBetween(10,60);
    });

    it("should return a offsetable value", function(){
        var dice = GURPS.Parser.parse("1d6+3");

        var value = dice.cast();

        expect(value).toBeBetween(4,10);
    });

    it("should return a offsetable value in both directions", function(){
        var dice = GURPS.Parser.parse("1d6-2");

        var value = dice.cast();

        expect(value).toBeBetween(-1,4);
    });
});
