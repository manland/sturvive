define('helper/LangHelper', function() {

  var currentLang, potentialLang;
  try {
    currentLang = navigator.language.substring(0,2);
    potentialLang = window.location.hash.substring(1);
  } catch(e) {
    currentLang = 'en';
    potentialLang = 'en';
  }
  
  if(potentialLang === 'en') {
    currentLang = 'en';
  } else if(potentialLang === 'fr') {
    currentLang = 'fr';
  }
  if(currentLang === undefined || currentLang === null) {
    currentLang = 'en';
  }
  if(currentLang !== 'en' && currentLang !== 'fr') {
    currentLang = 'en';
  }

  var lang = { en: {}, fr: {} };

  lang.en.title = 'Sturvive';
  lang.fr.title = 'Sturvive';
  lang.en.back = 'Back';
  lang.fr.back = 'Précédent';
  lang.en.prev = 'Previous';
  lang.fr.prev = 'Précédent';
  lang.en.next = 'Next';
  lang.fr.next = 'Suivant';

  /*************************\
  * HOME PAGE               *
  \*************************/
  lang.en.homeStart = 'Start';
  lang.fr.homeStart = 'Démarrer';
  lang.en.homeHelp = 'Help';
  lang.fr.homeHelp = 'Aide';
  lang.en.homeOptions = 'Options';
  lang.fr.homeOptions = 'Options';
  lang.en.homeCompatibility = 'Compatibility';
  lang.fr.homeCompatibility = 'Compatibilité';

  /*************************\
  * HELP PAGE               *
  \*************************/
  lang.en.helpTitle = 'Help';
  lang.fr.helpTitle = 'Aide';

  /*************************\
  * OPTIONS PAGE            *
  \*************************/
  lang.en.optionsTitle = 'Options';
  lang.fr.optionsTitle = 'Options';

  /*************************\
  * COMPATIBILITY PAGE      *
  \*************************/
  lang.en.compatibilityTitle = 'Compatibility';
  lang.fr.compatibilityTitle = 'Compatibilité';
  lang.en.compatibilityPageNoCompatible = 'We are sorry, but your browser doesn\'t allow you to play ! Please upgrade it or change it !';
  lang.fr.compatibilityPageNoCompatible = 'Nous sommes désolés mais ton navigateur ne te permet pas de jouer ! S\'il te plaît mets le à jour ou changes en !';
  lang.en.compatibilityPageNoFullCompatible = 'Your browser is not fully compatible with the game, but you can still play !';
  lang.fr.compatibilityPageNoFullCompatible = 'Ton navigateur n\'est pas complètement compatible, mais tu peux jouer quand même !';
  lang.en.compatibilityPageTryBack = 'Try anyway';
  lang.fr.compatibilityPageTryBack = 'Essayer quand même';
  lang.en.compatibilityWebGLDescription = 'All the game is based on this system !';
  lang.fr.compatibilityWebGLDescription = 'Le jeu est en 3d grâce à ce système !';
  lang.en.compatibilityCssTransitionDescription = 'TODO';
  lang.fr.compatibilityCssTransitionDescription = 'TODO';
  lang.en.compatibilityClassListDescription = 'TODO';
  lang.fr.compatibilityClassListDescription = 'TODO';
  lang.en.compatibilityLocalStorageDescription = 'TODO';
  lang.fr.compatibilityLocalStorageDescription = 'TODO';
  lang.en.compatibilityMp3Description = 'You can\'t play mp3 songs !';
  lang.fr.compatibilityMp3Description = 'Tu ne peux pas écouter le son au format mp3 !';
  lang.en.compatibilityWavDescription = 'You can\'t play wav songs !';
  lang.fr.compatibilityWavDescription = 'Tu ne peux pas écouter le son au format wav !';
  lang.en.compatibilityOggDescription = 'You can\'t play ogg songs !';
  lang.fr.compatibilityOggDescription = 'Tu ne peux pas écouter le son au format ogg !';
  lang.en.compatibilityNavigatorLanguageDescription = 'Game can\'t select your language !';
  lang.fr.compatibilityNavigatorLanguageDescription = 'Le jeu ne peut pas sélectionner ta langue !';

  /*************************\
  * PAUSE PAGE              *
  \*************************/
  lang.en.pauseTitle = 'Pause';
  lang.fr.pauseTitle = 'Pause';
  lang.en.pauseHelp = 'Help';
  lang.fr.pauseHelp = 'Aide';
  lang.en.pauseOptions = 'Options';
  lang.fr.pauseOptions = 'Options';
  lang.en.pauseRestart = 'Restart';
  lang.fr.pauseRestart = 'Redémarrer';

  /*************************\
  * GAME PAGE               *
  \*************************/
  lang.en.forwardKeyboardDescription = 'To go forward use up key !';
  lang.fr.forwardKeyboardDescription = 'Pour aller en avant utilise la flêche du haut !';
  lang.en.backwardKeyboardDescription = 'To go backward use down key !';
  lang.fr.backwardKeyboardDescription = 'Pour aller en arrière utilise la flêche du bas !';
  lang.en.leftKeyboardDescription = 'To go left use left key !';
  lang.fr.leftKeyboardDescription = 'Pour aller à gauche utilise la flêche gauche !';
  lang.en.rightKeyboardDescription = 'To go right use right key !';
  lang.fr.rightKeyboardDescription = 'Pour aller à droite utilise la flêche droite !';
  lang.en.tournLeftKeyboardDescription = 'To tourn righ use c key !';
  lang.fr.tournLeftKeyboardDescription = 'Pour tourner à gauche utilise la touche c !';
  lang.en.tournRightKeyboardDescription = 'To tourn left use v key !';
  lang.fr.tournRightKeyboardDescription = 'Pour tourner à droite utilise la touche v !';
  lang.en.shootKeyboardDescription = 'To shoot use space key !';
  lang.fr.shootKeyboardDescription = 'Pour tirer utilise la touche espace !';

  return {
    get: function(key) {
      return lang[currentLang][key];
    },
    getCurrentLang: function() {
      return currentLang;
    }
  };

});