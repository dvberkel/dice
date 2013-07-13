/*global describe:false, it:false, expect:false, GURPS:false*/
describe("Description", function(){
    it("should have a default dice value", function(){
        var description = new GURPS.Description();

        expect(description.isValid()).toBeTruthy();
    });

    it("should detect invalid descriptions", function(){
        var description = new GURPS.Description();

        description.set("description", "bla");

        expect(description.isValid()).toBeFalsy();
    });
});
