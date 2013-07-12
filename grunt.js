var fs = require("fs");
var PEG = require("pegjs");

module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-peg');

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
                console: false,
                openDatabase: false
            }
        },
        concat: {
            dist: {
                src: [
		    "src/GURPS.js",
		    "src/Die.js",
		    "grammar/Parser.js",
		    "src/Description.js",
		    "src/Database.js",
		    "src/Views.js",
		    "src/Reporter.js"
		],
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
	generate : {
	    namespace: {
		data : grunt.file.readJSON("package.json"),
		templateFile : "template/GURPS.tmpl",
		outputFile : "src/GURPS.js"
	    },
	    manifest: {
		data : grunt.file.readJSON("package.json"),
		templateFile : "template/manifest.tmpl",
		outputFile : "manifest.json"
	    }
	},
	peg: {
	    die : {
		grammar: "grammar/die.peg",
		exportVar: "GURPS.Parser",
		outputFile: "grammar/Parser.js"
	    }
	},
    });

    grunt.registerMultiTask("generate", "generate a file from a template", function(){
	var data = this.data.data;
	var templateFile = this.data.templateFile;
	var outputFile = this.data.outputFile;

	var template = grunt.file.read(templateFile);
	grunt.file.write(outputFile, grunt.template.process(template, data));

    });

    grunt.registerTask("default", 'lint generate:namespace peg:die concat min generate:manifest compress');
}
