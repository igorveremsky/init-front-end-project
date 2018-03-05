'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Variables
        htmlPartialPath: './partial',
        assetsPath: './assets',

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
            },
            // Copy latest lodash version to vendor js directory
            lodashJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/lodash/',
                        src: ['lodash.min.js'],
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
                    'assets/js/vendor/jquery.min.js',
                    //'assets/js/vendor/jquery-migrate.min.js',
                    'assets/js/vendor/lodash.min.js',
                    // 'assets/js/vendor/floatlabels.js',
                    // 'assets/js/vendor/fresko.js',
                    // 'assets/js/vendor/googlemaps.infobox.min.js',
                    // 'assets/js/vendor/jquery.foundation.plugins.js',
                    // 'assets/js/vendor/modernizr.custom.min.js',
                    // 'assets/js/vendor/jquery.fullpage.js',
                    // 'assets/js/vendor/jquery.gmap.min.js',
                    // 'assets/js/vendor/jquery.isotope.min.js',
                    // 'assets/js/vendor/jquery.mousewheel.js',
                    // 'assets/js/vendor/jquery.stellar.js',
                    // 'assets/js/vendor/owl.carousel.js',
                    // 'assets/js/vendor/perfect-scrollbar.js',
                    // 'assets/js/vendor/scrolloverflow.min.js',
                    // 'assets/js/vendor/skrollr.min.js',
                    // 'assets/js/vendor/SmoothScroll.js',
                    // 'assets/js/vendor/TweenMax.min.js',
                    // 'assets/js/vendor/ScrollToPlugin.min.js',
                    // 'assets/js/vendor/waypoints.min.js'
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

        // HTML Build by partial
        htmlbuild: {
            app: {
                src: '<%= htmlPartialPath %>/*.html',
                options: {
                    sections: {
                        global: {
                            head: '<%= htmlPartialPath %>/global/head.html',
                            header: '<%= htmlPartialPath %>/global/header.html',
                            footer: '<%= htmlPartialPath %>/global/footer.html'
                        }
                    },
                    data: {
                        cssVendorVersion: "0.0.5",
                        cssAppVersion: "1.0.0",
                        jsVendorVersion: "0.5.0",
                        jsAppVersion: "1.0.0"
                    }
                }
            }
        },

        // Watch files changes
        watch: {
            html: {
                files: [
                    'Gruntfile.js',
                    'partial/*.html',
                    'partial/**/*.html'
                ],
                tasks: ['htmlbuild']
            },
            css: {
                files: [
                    'Gruntfile.js',
                    'assets/sass/app.scss',
                    'assets/sass/*/*.scss',
                    'assets/sass/*/*/*.scss',
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
            },
            jsVendor: {
                files: [
                    'Gruntfile.js',
                    'assets/js/vendor/*.js'
                ],
                tasks: ['concat:vendor', 'uglify:vendor']
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
    grunt.loadNpmTasks('grunt-html-build');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'compass', 'cssmin', 'concat', 'uglify', 'htmlbuild']);
    grunt.registerTask('front-dev', ['default', 'connect:server', 'watch']);
    grunt.registerTask('back-dev', ['default', 'watch']);
};