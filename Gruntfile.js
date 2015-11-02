/*
 * Generated on 2015-07-24
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist'
        },

        watch: {
            assemble: {
                files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
                tasks: ['assemble']
            },
            sass :{
                files: ['<%= config.src %>/assets/theme/sass/**/*' ],
                tasks: ['sass','copy']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dist %>/{,*/}*.html',
                    '<%= config.dist %>/assets/{,*/}{,*/}*.css',
                    '<%= config.dist %>/assets/{,*/}*.js',
                    '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>/assets',
                    layout: '<%= config.src %>/templates/layouts/default.hbs',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/templates/partials/*.hbs',
                    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
                }
            }
        },

        copy: {
            theme: {
                expand: true,
                cwd: '<%= config.src %>/assets/theme/',
                src: ['css/**/*', 'js/*','fonts/*','!sass/*'],
                dest: '<%= config.dist %>/assets/theme/'
            },
            images: {
                expand: true,
                cwd: '<%= config.src %>/assets/images/',
                src: '**',
                dest: '<%= config.dist %>/assets/images/'
            }
        },

        // Before generating any new files,
        // remove any previously-created files.
        clean: ['<%= config.dist %>/**/*'],

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/assets/theme/sass/',
                    src: ['**/*.scss'],
                    dest: '<%= config.src %>/assets/theme/css/',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('server', [
        'build',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass',
        'clean',
        'copy',
        'assemble'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
