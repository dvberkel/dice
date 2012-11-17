var fs = require("fs");
var PEG = require("pegjs");

module.exports = function(grunt){
    grunt.initConfig({
        lint: {
            all: ["spec/*.js", "src/*.js", "js/alea.js"]
        },
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                undef: true,
                unused: true,
                trailing: true
            },
            globals: {
                jQuery: false,
                $: false,
                _: false,
                Backbone: false,
                GURPS: true,
                describe: false,
                it: false,
                expect: false,
                beforeEach: false,
                console: false
            }
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
        fs.writeFileSync(outputFile, exportVar + " = " + parser.toSource() + ";", "utf8");
    });

    grunt.registerTask("default", 'lint generate concat min');
}
