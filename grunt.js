module.exports = function(grunt){
    grunt.initConfig({
	lint: {
	    all: ["spec/*.js", "src/*.js", "js/alea.js"]
	},
	concat: {
	    dist: {
		src: ["src/GURPS.js", "src/Die.js", "src/Parser.js", "src/Description.js", "src/Views.js" ],
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

    grunt.registerTask("default", 'lint');
}