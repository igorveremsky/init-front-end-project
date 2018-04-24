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
                    hostname: '0.0.0.0',
                    //open: true,
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
            // Copy latest tweenlite js version to vendor js directory
            easePackJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/gsap/src/minified/easing',
                        src: ['EasePack.min.js'],
                        dest: 'assets/js/vendor/'
                    }
                ]
            },
            // Copy latest tweenlite js version to vendor js directory
            cssGsap: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/gsap/src/minified/plugins',
                        src: ['CSSPlugin.min.js'],
                        dest: 'assets/js/vendor/'
                    }
                ]
            },
            // Copy latest tweenlite js version to vendor js directory
            tweenLiteJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/gsap/src/minified',
                        src: ['TweenLite.min.js'],
                        dest: 'assets/js/vendor/'
                    }
                ]
            },
            // Copy latest tweenlite js version to vendor js directory
            timelineLiteJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/gsap/src/minified',
                        src: ['TimelineLite.min.js'],
                        dest: 'assets/js/vendor/'
                    }
                ]
            },
            // Copy latest is in viewport js version to vendor js directory
            isInViewportJs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/is-in-viewport/lib',
                        src: ['isInViewport.min.js'],
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
                    'assets/js/vendor/EasePack.min.js',
                    'assets/js/vendor/CSSPlugin.min.js',
                    'assets/js/vendor/TweenLite.min.js',
                    'assets/js/vendor/TimelineLite.min.js',
                    'assets/js/vendor/isInViewport.min.js',
                    'assets/js/vendor/smoothScroll.js'
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
                        appName: "Front End Demo Project",
                        cssVendorVersion: "0.1.0",
                        cssAppVersion: "0.13.0",
                        jsVendorVersion: "0.7.0",
                        jsAppVersion: "0.5.0"
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
            cssVendor: {
                files: [
                    'Gruntfile.js',
                    'assets/sass/vendor/*.scss',
                    'assets/sass/vendor.scss'
                ],
                tasks: ['compass:vendor', 'cssmin:vendor']
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