module.exports = function(grunt) {    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: {
            	   'dist/index.html': ['src/index.html'],
            	   'dist/jquery.js': ['lib/jquery/jquery-2.1.3.js'],
               	   'dist/jquery.mobile.js': ['lib/jquery/jquery.mobile.custom.js'],
            	   'dist/require.js': ['bower_components/requirejs/require.js'],
            	   'dist/snap.js': ['lib/snapsvg/snap.svg.js'],
            	   'dist/proscenium.js': ['lib/proscenium/proscenium.js']
        	    }
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
