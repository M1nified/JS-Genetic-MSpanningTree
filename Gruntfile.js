module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.initConfig({
    typescript:{
      base:{
        options:{
          module: "none",
          target:"es6",
          // noImplicitAny: true,
          removeComments: true,
          preserveConstEnums: true,
          sourceMap: true,
          declaration:true
        },
        src:["src/Types.ts","src/MST.ts"],
        dest:'build/main.js' 
      }
    },
    watch:{
      all:{
        files:['src/*'],
        tasks:['typescript:base'],
        options:{
          spawn:false,
          atBegin:true
        }
      }
    },
    karma:{
      options:{
        port:9876,
        browsers:['Chrome'],
        frameworks:['jasmine']
      },
      base : {
        files: [
            {src : ['build/*.js','!build/run.js']},
            {src : 'test/*.js'}
        ]
      }
    }
  })
  
  grunt.registerTask('default',['watch:all'])
}