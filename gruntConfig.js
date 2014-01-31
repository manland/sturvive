module.exports = {
  
  build_dir: 'build',
  compile_dir: 'bin',

  nojs_sentence: 'Please, activate javascript in your browser !',
  description: 'A starship survive 3d game.',
  descriptionFr: 'Un jeu de vaisseau spatial en 3d.',
  author: 'Maneschi Romain',
  authorUrl: 'http://romain.maneschi.fr',
  icon128: 'assets/img/128.png',

  app_files: {
    favicon: 'assets/img/favicon.png',
    first: [],
    last: 'src/main.js',
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
