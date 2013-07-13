/*global module:false*/
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
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
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/**/*.js', 'spec/**/*.js']
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
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
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src : "js/gurps.js",
                dest: "js/gurps.min.js"
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test']
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
                src: 'grammar/die.peg',
                dest: 'grammar/Parser.js',
		options: {
                    exportVar: 'GURPS.Parser'
		}
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-peg');


    grunt.registerMultiTask("generate", "generate a file from a template", function(){
        var data = this.data.data;
        var templateFile = this.data.templateFile;
        var outputFile = this.data.outputFile;

        var template = grunt.file.read(templateFile);
        grunt.file.write(outputFile, grunt.template.process(template, data));

    });

    grunt.registerTask('default', [
        'jshint',
        'generate:namespace',
        'peg:die',
        'concat',
        'uglify',
        'generate:manifest',
        'compress'
    ]);
};
