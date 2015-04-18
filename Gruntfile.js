module.exports = function(grunt) {    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                	{
                	   dest: 'dist/require.js',
                	   src: ['bower_components/requirejs/require.js']
            	    },
            	    {
                	   dest: 'dist/proscenium.js',
                	   src: ['lib/proscenium/proscenium.js']
            	    }                	
            	]
            }
        },

        jasmine: {
            pivotal: {
                src: 'src/proscenium.js',
                options: {
                    specs: 'spec/*-spec.js',
                    helpers: 'spec/*-helper.js',
                    outfile: 'test-results.html',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: './',
                            deps: [
                                'bower_components/modernizr/modernizr',
                                'lib/bind-shim'
                            ]
                        }
                    }
                }
            }
        },

        jshint: {
            files: [
                'src/**/*.js'
            ]
        },
        
        requirejs: {
            main: {
                options: {
                    baseUrl: './',
                    findNestedDependencies: true,
                    name: 'src/proscenium.js',
                    optimize: 'none',
                    out: 'dist/proscenium.amd.js'
                }
            }
        },

        stylus: {
            merge: {
                options: {
                    paths: ['stylus', 'bower_components'],
                    linenos: true
                },
                files: {
                    'dist/main.css': 'stylus/main.styl'
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint']
            },
            stylesheets: {
                files: ['stylus/**/*.styl'],
                tasks: ['stylus']
            }
        }
    });

    // Load tasks (must be installed via npm first)
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'copy', 'stylus']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['jshint', 'jasmine', 'requirejs', 'stylus']);
};
