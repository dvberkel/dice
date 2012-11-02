module.exports = function(grunt){
    grunt.initConfig({
	lint: {
	    all: ["spec/*.js", "src/*.js", "js/*.js"]
	},
	concat: {
	    dist : {
		src: ["src/GURPS.js", "src/Die.js", "src/Parser.js", "src/Description.js", "src/Views.js" ],
		dest: "js/gurps.js"
	    }
	}
    });

    grunt.registerTask("default", 'lint');
}