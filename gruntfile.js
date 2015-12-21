var grunt = require('grunt');
require('actionhero/grunt')(grunt);

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-ng-annotate');
grunt.loadNpmTasks('grunt-shell');

grunt.initConfig({
    less: {
        development: {
            options: {
                plugins: [
                    new (require('less-plugin-autoprefix'))({
                        browsers: ["last 2 versions"]
                    })
                ]
            },
            files: {
                "public/css/style.css": ["public/less/**/*.less", "public/app/**/*.less"]
            }
        },
        production: {
            options: {
                plugins: [
                    new (require('less-plugin-autoprefix'))({
                        browsers: ["last 2 versions"]
                    }),
                    new (require('less-plugin-clean-css'))({

                    })
                ]
            },
            files: {
                "public/css/style.css": ["public/less/**/*.less", "public/app/**/*.less"]
            }
        }
    },
    watch: {
        lessDevelopment: {
            files: ['public/less/**/*.less', "public/app/**/*.less"],
            tasks: ['less:development']
        },
        lessProduction: {
            files: ['public/less/**/*.less', "public/app/**/*.less"],
            tasks: ['less:production']
        },
        jsDevelopment: {
            files: ['public/app/**/*.js'],
            tasks: ['concat:jsDevelopment', 'ngAnnotate:js']
        },
        jsProduction: {
            files: ['public/app/**/*.js'],
            tasks: ['build-prod-js']
        }
    },
    concat: {
        jsDevelopment: {
            src: ['public/app/**/*.module.js','public/app/**/*.js'],
            dest: 'public/javascript/app.js'
        },
        jsProduction: {
            src: ['public/app/**/*.module.js','public/app/**/*.js'],
            dest: 'public/javascript/app.js'
        }
    },
    uglify: {
        production: {
            files: {
                'public/javascript/app.js': 'public/javascript/app.js'
            }
        }
    },
    concurrent: {
        options: {
            logConcurrentOutput: true
        },
        development: [
            'watch:lessDevelopment',
            'watch:jsDevelopment',
            'shell:actionhero'
        ],
        production: [
            'watch:lessProduction',
            'watch:jsProduction',
            'shell:actionhero'
        ]
    },
    shell: {
        actionhero: {
            command: 'npm start'
        }
    },
    ngAnnotate: {
        js: {
            files: {
                'public/javascript/app.js': 'public/javascript/app.js'
            }
        }
    }
});

grunt.registerTask('serve-dev', 'Run rebl-public in dev mode', [
    'less:development',
    'concat:jsDevelopment',
    'ngAnnotate:js',
    'concurrent:development'
]);

grunt.registerTask('serve-prod', 'Run rebl-public in dev mode', [
    'build-prod',
    'concurrent:production'
]);

grunt.registerTask('build-prod', 'Run rebl-public in dev mode', [
    'less:production',
    'build-prod-js'
]);

grunt.registerTask('build-prod-js', 'Run rebl-public in dev mode', [
    'concat:jsProduction',
    'ngAnnotate:js',
    'uglify:production'
]);