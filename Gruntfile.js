module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'cache-busting': {
      options: {
        cleanup: true
      },
      css: {
        replace: ['build/**/*.html'],
        replacement: 'style.css',
        file: 'build/css/style.css'
      },
      scriptsApp: {
        replace: ['build/**/*.html'],
        replacement: 'scripts.js',
        file: 'build/js/scripts.js'
      },
      scriptsVendor: {
        replace: ['build/**/*.html'],
        replacement: 'vendor-scripts.js',
        file: 'build/js/vendor-scripts.js'
      }
    },

    clean: {
      build: {
        src: ['build/**/*']
      }
    },

    concat: {
      options: {
        separator: '\n;\n'
      },
      app: {
        src: [
          'js/app.js',
          'js/app/**/*.js'
        ],
        dest: 'build/js/scripts.js'
      },
      vendor: {
        src: [
          // jQuery
          'bower_components/jquery/dist/jquery.js',

          // Twitter Bootstrap scripts, commenting out the unused features
          'bower_components/bootstrap/js/transition.js',
          'bower_components/bootstrap/js/alert.js',
          'bower_components/bootstrap/js/button.js',
          'bower_components/bootstrap/js/carousel.js',
          'bower_components/bootstrap/js/collapse.js',
          'bower_components/bootstrap/js/dropdown.js',
          'bower_components/bootstrap/js/modal.js',
          'bower_components/bootstrap/js/tooltip.js',
          'bower_components/bootstrap/js/popover.js',
          'bower_components/bootstrap/js/scrollspy.js',
          'bower_components/bootstrap/js/tab.js',
          'bower_components/bootstrap/js/affix.js'
        ],
        dest: 'build/js/vendor-scripts.js',
      },
    },

    copy: {
      favicon: {
        files: [
          {expand: true, src: ['favicon.ico', 'apple-touch-icon.png'], dest: 'build'},
        ]
      },
      fonts: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/fonts/*.*'], dest: 'build/fonts'},
          {expand: true, src: ['fonts/*.*'], dest: 'build'}
        ]
      },
      html: {
        files: [
          {expand: true, src: ['index.html'], dest: 'build'},
          {expand: true, src: ['components/**/*.html'], dest: 'build'}
        ]
      },
      images: {
        files: [
          {expand: true, src: ['images/**/*.*'], dest: 'build'}
        ]
      },
      php: {
        files: [
          {expand: true, src: ['*.php', 'partials/**/*.php'], dest: 'build'}
        ]
      }
    },

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['images/**/*.{png,gif,jpg}'],
          dest: 'images/'
        }]
      },
      favicon: {
        files: [{
          expand: true,
          src: ['apple-touch-icon.png']
        }]
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        browser: true,
        curly: true,
        eqnull: true,
        eqeqeq: true,
        undef: true,
        devel: true,
        ignores: [],
        globals: {
          butcher: true,
          grecaptcha: true
        }
      },
      files: {
        src: ['js/**/*.js']
      }
    },

    less: {
      development: {
        src: 'less/style.less',
        dest: 'build/style.css'
      },
      production: {
        options: {
          cleancss: true
        },
        src: 'less/style.less',
        dest: 'build/style.css'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      app: {
        src: 'build/js/scripts.js',
        dest: 'build/js/scripts.js'
      },
      vendor: {
        src: 'build/js/vendor-scripts.js',
        dest: 'build/js/vendor-scripts.js'
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'less/**/*.less',
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['*.html', 'components/**/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['images/**/*.*'],
        tasks: ['copy:images'],
        options: {
          spawn: false
        }
      },
      php: {
        files: ['server/**/*.php'],
        tasks: ['copy:php'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'concat:app'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-cache-busting');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean:build', 'less:development', 'jshint', 'concat', 'copy', 'watch']);
  grunt.registerTask('build', ['clean:build', 'less:production', 'concat', 'imagemin', 'copy', 'uglify', 'cache-busting']);
};
