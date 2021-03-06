module.exports = function ( grunt ) {
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  var gruntConfig = require( './gruntConfig.js' );

  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },

    clean: [ 
      '<%= build_dir %>', 
      '<%= compile_dir %>'
    ],

    copy: {
      build: {
        files: [
          {
            src: [ '<%= app_files.js %>','<%= vendor_files.js %>', '<%= app_files.assets %>', '<%= app_files.stylesheet %>' ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile: {
        files: [
          {
            src: [ '**/*' ],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/app/assets',
            expand: true
          }
        ]
      }
    },

    concat: {
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [ 
          '<%= vendor_files.js %>', 
          '<%= app_files.first %>',
          '<%= build_dir %>/app/src/**/*.js'   
        ],
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      compile_css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [ 
          '<%= app_files.stylesheet %>',
        ],
        dest: '<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>.css'
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>/app',
        src: [
          '<%= vendor_files.js %>',
          '<%= app_files.first %>',
          '<%= build_dir %>/app/src/**/*.js',
          '<%= app_files.last %>',
          '<%= build_dir %>/app/stylesheet/**/*.css',
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= concat.compile_css.dest %>'
        ]
      }
    },

    manifest: {
      build: {
        dir: '<%= build_dir %>/app',
        path: '/'
      },
      compile: {
        dir: '<%= compile_dir %>',
        path: '<%= lanchPath %>'
      }
    },

    watch: {
      files: [ '<%= app_files.html %>', 
               '<%= app_files.js %>', 
               '<%= vendor_files.js %>', 
               '<%= app_files.assets %>', 
               '<%= app_files.stylesheet %>', 
               '<%= test_files.js %>' 
            ],
      tasks: ['jshint', /*'karma:build:run',*/ 'build']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      build: {
        runnerPort: 9101,
        background: true
      },
      compile: {
        singleRun: true,
        background: false
      }
    },

    jshint: {
      files: [ '<%= app_files.js %>',  
               '<%= test_files.js %>' 
            ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        strict: false,
        browser : true,
        undef: false,
        indent: 2,
        quotmark : 'single',
        globals: {
          /*tests functions exclude*/
          define: false,
          module: false,
          describe: false,
          beforeEach: false,
          it: false,
          expect: false,
          requirejs: false,
          dump: false 
        }
      }
    },

    connect: {
      build: {
        options: {
          port: 8080,
          base: '<%= build_dir %>/app',
          keepalive: false,
          hostname: '*'
        }
      },
      compile: {
        options: {
          port: 8080,
          base: '<%= compile_dir %>',
          keepalive: true,
          hostname: '*'
        }
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig, gruntConfig ) );

  grunt.registerTask( 'build', [ 'clean', 'copy:build', 'index:build', 'manifest:build'] );
  
  grunt.registerTask( 'compile', [ 'jshint', /*'karma:compile:start',*/ 'build', 'concat:compile_js', 'concat:compile_css', 'uglify:compile', 'copy:compile', 'index:compile', 'manifest:compile'] );

  grunt.registerTask( 'compile-dev', [ 'compile', 'connect:compile' ] );

  grunt.registerTask( 'dev', [ 'connect:build','jshint', 'karma:build:start', /*'karma:build:run',*/ 'build', 'watch' ] );

  grunt.registerTask( 'default', [ 'build'] );


  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  function filterForLESS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /main\.less$/ ) || file.match( /\.css$/ );
    });
  }

  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+this.data.dir+')\/', 'g' );
    
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace('app/vendor', 'vendor').replace( dirRE, '' );
    });

    var lessFiles = filterForLESS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    var last;
    for(var i=0, len=jsFiles.length; i<len && last === undefined; i++) {
      if(jsFiles[i] === grunt.config('app_files.last')) {
        last = jsFiles[i];
        jsFiles.splice(i, 1);
        jsFiles.push(last);
      }
    }

    grunt.file.copy('app/index.tpl.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: lessFiles,
            version: grunt.config( 'pkg.version' ),
            description: grunt.config( 'description' ),
            descriptionFr: grunt.config( 'descriptionFr' ),
            name: grunt.config('pkg.name'),
            favicon: grunt.config('app_files.favicon'),
            nojs_sentence: grunt.config('nojs_sentence'),
            author: grunt.config('author'),
            authorUrl: grunt.config('authorUrl')
          }
        });
      }
    });
  });

  grunt.registerMultiTask( 'manifest', 'Process manifest template', function () {
    var launch_path = this.data.path;
    grunt.file.copy('app/manifest.tpl.webapp', this.data.dir + '/manifest.webapp', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            launch_path: launch_path,
            name: grunt.config('pkg.name'),
            description: grunt.config( 'description' ),
            descriptionFr: grunt.config( 'descriptionFr' ),
            favicon: grunt.config('app_files.favicon'),
            nojs_sentence: grunt.config('nojs_sentence'),
            author: grunt.config('author'),
            authorUrl: grunt.config('authorUrl'),
            icon32: grunt.config('icon32'),
            icon60: grunt.config('icon60'),
            icon90: grunt.config('icon90'),
            icon128: grunt.config('icon128'),
            icon256: grunt.config('icon256')
          }
        });
      }
    });
  });

};
