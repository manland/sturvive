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
      var mainDiv = DomHelper.addContainer('options');
      var sizeScreenDiv = DomHelper.buildDiv('sizeScreenContainer');
      var sizeScreenViewContainer = DomHelper.buildDiv('sizeScreenViewContainer');
      var sizeScreenView = DomHelper.buildDiv('sizeScreenView');
      var buttonsDiv = DomHelper.buildDiv('buttonContainer');
      sizeScreenViewContainer.appendChild(sizeScreenView);
      buttonsDiv.appendChild(DomHelper.buildButton('30%', function() {
        sizeScreenView.style.width = '30%';
        sizeScreenView.style.height = '30%';
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('50%', function() {
        sizeScreenView.style.width = '50%';
        sizeScreenView.style.height = '50%';
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('100%', function() {
        sizeScreenView.style.width = '99%';
        sizeScreenView.style.height = '99%';
      }));
      sizeScreenView.style.width = '30%';
      sizeScreenView.style.height = '30%';
      sizeScreenDiv.appendChild(DomHelper.buildTitle('ScreenSize'));
      sizeScreenDiv.appendChild(buttonsDiv);
      sizeScreenDiv.appendChild(sizeScreenViewContainer);
      mainDiv.appendChild(sizeScreenDiv);

    }

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);