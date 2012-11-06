var fs = require("fs");
var PEG = require("pegjs");

module.exports = function(grunt){
    grunt.initConfig({
        lint: {
            all: ["spec/*.js", "src/*.js", "js/alea.js"]
        },
        concat: {
            dist: {
                src: ["src/GURPS.js", "src/Die.js", "grammar/Parser.js", "src/Description.js", "src/Views.js" ],
                dest: "js/gurps.js"
            }
        },
        min: {
            dist: {
                src : ["js/gurps.js"],
                dest: "js/gurps.min.js"
            }
        }
    });

    grunt.registerTask("generate", function(){
        var grammar = fs.readFileSync("grammar/die.peg", "utf8");
        var parser = PEG.buildParser(grammar);
        fs.writeFileSync("grammar/Parser.js", "GURPS.Parser = " + parser.toSource(), "utf8", function(error){
            if (error) throw error;
            console.log("saved");
        });
    });

    grunt.registerTask("default", 'lint');
}
