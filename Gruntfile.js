'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Front server connect
        connect: {
            server: {
                options: {
                    //livereload: true,
                    port: 8000,
                    base: './'
                }
            }
        },

        // Copy files
        copy: {
            // Copy Font Awesome Fonts from node-modules to public directory
            fontAwesomeFonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/font-awesome/fonts/',
                        src: ['**'],
                        dest: 'assets/fonts/font-awesome/',
                        filter: 'isFile'
                    }
                ]
            },
            // Copy latest jquery version to vendor js directory
            jqueryJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: ['jquery.min.js'],
                        dest: 'assets/js/vendor/'
                    }
                ]
            }
        },

        // Style (Sass) compilation via Compass
        compass: {
            vendor: {
                options: {
                    specify: 'assets/sass/vendor.scss',
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    noLineComments: true,
                    sourcemap: true
                }
            },
            app: {
                options: {
                    specify: 'assets/sass/app.scss',
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    fontsDir: 'assets/fonts',
                    noLineComments: true,
                    sourcemap: true
                }
            }
        },

        // Css Minify
        cssmin: {
            vendor: {
                options: {
                    sourceMap: false,
                    level: 2
                },
                files: {
                    'assets/css/vendor.min.css': ['assets/css/vendor.css']
                }
            },
            app: {
                options: {
                    sourceMap: true,
                    level: 2
                },
                files: {
                    'assets/css/app.min.css': ['assets/css/app.css']
                }
            }
        },

        // Concat scripts
        concat: {
            vendor: {
                src: [
                    'assets/js/vendor/**'
                ],
                dest: 'assets/js/vendor.js'
            },
            app: {
                src: [
                    'assets/js/partial/*.js'
                ],
                dest: 'assets/js/app.js'
            }
        },

        // Minify scripts
        uglify: {
            vendor: {
                files: {
                    'assets/js/vendor.min.js': [
                        'assets/js/vendor.js'
                    ]
                }
            },
            app: {
                files: {
                    'assets/js/app.min.js': [
                        'assets/js/app.js'
                    ]
                }
            }
        },

        // Watch files changes
        watch: {
            css: {
                files: [
                    'Gruntfile.js',
                    'assets/sass/app.scss',
                    'assets/sass/*/*.scss',
                    '!assets/sass/vendor/*.scss'
                ],
                tasks: ['compass:app', 'cssmin:app']
            },
            js: {
                files: [
                    'Gruntfile.js',
                    'assets/js/*/*.js',
                    '!assets/js/vendor/*.js'
                ],
                tasks: ['concat:app', 'uglify:app']
            }
        }
    });

    // Load the plugin task.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'compass', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('front-dev', ['default', 'connect:server', 'watch']);
    grunt.registerTask('back-dev', ['default', 'watch']);
};