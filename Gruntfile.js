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
            livereload: 
			{
                files: ['shaders/{,**/}*.glsl', 'index.html', 'src/{,**/}*.js'],
                tasks: ['build'],
                options: 
				{
                    spawn: false,
                }
            }
        }

	});
	grunt.loadNpmTasks('grunt-build-control');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['browserify']);
	grunt.registerTask('heroku', ['browserify:dist']);

	grunt.registerTask('default', ['build']);
};
