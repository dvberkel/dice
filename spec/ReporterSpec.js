/*global describe:false, it:false, expect:false, GURPS:false*/
describe("A Reporter", function(){
    var InvokedStore = function(){
        this.invoked = false;
        this.sides = undefined;
        this.value = undefined;
        this.store = function(sides, value){
            this.invoked = true;
            this.sides = sides;
            this.value = value;
        };
    };

    it("should store result of a die thrown", function(){
        var invokedStore = new InvokedStore();
        var reporter = new GURPS.Reporter({
            stores : [invokedStore]
        });

        reporter.report(6, 1);

        expect(invokedStore.invoked).toBeTruthy();
        expect(invokedStore.sides).toBe(6);
        expect(invokedStore.value).toBe(1);
    });

    it("should store results when a die is cast", function(){
        var invokedStore = new InvokedStore();
        var reporter = new GURPS.Reporter({
            stores : [invokedStore]
        });
        var die = new GURPS.Die({ sides : 3 });
        reporter.monitor(die);

        die.cast();

        expect(invokedStore.invoked).toBeTruthy();
        expect(invokedStore.sides).toBe(3);
    });

});
