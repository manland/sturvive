define('page/OptionsPage',
  ['helper/DomHelper', 'helper/LangHelper'],
  function(DomHelper, LangHelper) {

    var backCallback;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.addPageTitle(LangHelper.get('optionsTitle'));
      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
    }

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);