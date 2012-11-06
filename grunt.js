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
        var inputFile = "grammar/die.peg";
        var outputFile = "grammar/Parser.js";
        var exportVar = "GURPS.Parser";
        var grammar = fs.readFileSync(inputFile, "utf8");
        var parser = PEG.buildParser(grammar);
        fs.writeFileSync(outputFile, exportVar + " = " + parser.toSource(), "utf8");
    });

    grunt.registerTask("default", 'lint');
}
