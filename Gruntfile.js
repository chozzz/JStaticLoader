/*!
    * JStaticLoader's Gruntfile
    * No copyright whatsoever
    */

'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: 'src/.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/*.js'
            ]
        }
    });

    Object.keys(require('./package.json').devDependencies).forEach(function(dep) {
        if(dep.substring(0,6) === "grunt-") {
            grunt.loadNpmTasks(dep);
        }
    });

    // Default task(s).
    grunt.registerTask('build', [
        'jshint',
        'uglify'
    ]);

};