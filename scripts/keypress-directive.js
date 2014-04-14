angular.module('pianoApp')
  .directive('ngEnter', function () {
    var keyBindingMap = {
      '49': 'whole', // 1
      '52': 'quarter', //4
      '56': 'eighth' //8
    };

    return function (scope, element, attrs) {
      element.bind("keypress", function (event) {
        var keyPressed = event.which;
        event.preventDefault();
        if (keyPressed === 97) { // Keypress 'a' to add selected notes to song
          scope.addNotesToSong();
        } else if (keyBindingMap[keyPressed]) {
          scope.updateDuration(keyBindingMap[keyPressed]);
        }
      });
    };
  });