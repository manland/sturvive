module.exports = {
  
  build_dir: 'build',
  compile_dir: 'bin',

  
  app_files: {
    first: [],
    js: [ 'app/src/**/*.js' ],
    html: [ 'app/index.tpl.html' ],
    stylesheet: ['app/stylesheet/**/*.css'],
    assets: ['app/assets/**/*']
  },

  test_files: {
    js: [
      'test/**/*.js'
    ]
  },

  vendor_files: {
    js: [
      'app/vendor/goo-0.6.0/lib/goo-require.js'
    ],
    css: [
    ],
    assets: [
    ]
  },
};
