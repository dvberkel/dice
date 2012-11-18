var fs = require("fs");
var PEG = require("pegjs");

module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-compress');

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
        },
	compress: {
	    zip: {
		files: {
		    "dice.zip": ["index.html", "js/*", "lib/*", "css/*", "image/*", "manifest.json"]
		}
	    }
	},
	generate_namespace: {
	    templateFile : "template/GURPS.tmpl",
	    outputFile : "src/GURPS.js"
	},
	generate_parser: {
	    inputFile: "grammar/die.peg",
	    outputFile: "grammar/Parser.js",
	    exportVar: "GURPS.Parser"
	},
	generate_manifest: {
	    templateFile : "template/manifest.tmpl",
	    outputFile : "manifest.json"
	}
    });

    grunt.registerTask("generate_namespace", "generate the GURPS.js from a template", function(){
	var data = grunt.file.readJSON("package.json");
	var templateFile = grunt.config("generate_namespace.templateFile");
	var outputFile = grunt.config("generate_namespace.outputFile");
	
	var template = grunt.file.read(templateFile);
	grunt.file.write(outputFile, grunt.template.process(template, data));
    });

    grunt.registerTask("generate_parser", "generate Parser.js from a peg grammar", function(){
        var outputFile = grunt.config("generate_parser.outputFile");
        var exportVar = grunt.config("generate_parser.exportVar");
        var grammar = grunt.file.read(grunt.config("generate_parser.inputFile"));
        var parser = PEG.buildParser(grammar);
        grunt.file.write(outputFile, exportVar + " = " + parser.toSource() + ";");
    });

    grunt.registerTask("generate_manifest", "generate the manifest.json from a template", function(){
	var data = grunt.file.readJSON("package.json");
	var templateFile = grunt.config("generate_manifest.templateFile");
	var outputFile = grunt.config("generate_manifest.outputFile");
	
	var template = grunt.file.read(templateFile);
	grunt.file.write(outputFile, grunt.template.process(template, data));
    });

    grunt.registerTask("default", 'lint generate_namespace generate_grammar concat min compress');
}
