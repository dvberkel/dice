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
            all: ['spec/*.js', 'src/*.js', 'js/alea.js']
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
                    'src/GURPS.js',
                    'src/Die.js',
                    'grammar/Parser.js',
                    'src/Description.js',
                    'src/Database.js',
                    'src/Views.js',
                    'src/Reporter.js'
                ],
                dest: 'js/gurps.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src : 'js/gurps.js',
                dest: 'js/gurps.min.js'
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
            'package': {
                src : ['index.html', 'js/*', 'lib/*', 'css/*', 'image/*', 'manifest.json'],
                options: {
                    archive: 'dice.zip',
                    mode: 'zip'
                }
            }
        },
        generate : {
            namespace: {
                src: 'template/GURPS.tmpl',
                dest: 'src/GURPS.js',
                options : {
                    data : grunt.file.readJSON('package.json')
                }
            },
            manifest: {
                src: 'template/manifest.tmpl',
                dest: 'manifest.json',
                options: {
                    data : grunt.file.readJSON('package.json')
                }
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


    grunt.registerMultiTask('generate', 'generate a file from a template', function(){
        var files = this.files;
        var options = this.options({});

        files.forEach(function(f){
            var src = f.src.filter(function(filepath){
                if(!grunt.file.exists(filepath)){
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            var template = src.map(function(filepath){
                return grunt.file.read(filepath);
            }).join(grunt.util.linefeed);

            grunt.file.write(f.dest, grunt.template.process(template, options.data));

            grunt.log.writeln('Generated "' + f.dest + '"');
        });
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
