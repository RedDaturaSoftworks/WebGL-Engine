module.exports = function (grunt) {
	'use strict';
    grunt.initConfig(
	{
        browserify: 
		{
            dist: 
			{
                files:
				 {
                    'build/index.js': ['src/**/*'],
                },
                options: 
				{
                    transform: ['glslify']
                }
            }
        },
        watch: 
		{
            options: 
			{
                livereload: true,
            },
            livereload: {
                files: ['shaders/{,**/}*.glsl', 'index.html', 'src/{,**/}*.js'],
                tasks: ['build'],
                options: {
                    spawn: false,
                }
            }
        },
		buildcontrol: 
		{
			options: 
			{
				dir: '.',
				commit: true,
				push: true,
				message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			},
			pages: 
			{
				options: 
				{
					remote: 'https://www.github.com/RedDaturaSoftworks/WebGL-Engine',
					branch: 'gh-pages'
				}
			},
			local: 
			{
				options:
				{
					remote: '../',
					branch: 'build'
				}
			}
		}

	});
	grunt.loadNpmTasks('grunt-build-control');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['browserify']);

	grunt.registerTask('default', ['build']);
};
