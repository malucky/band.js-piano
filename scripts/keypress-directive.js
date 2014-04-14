angular.module('pianoApp')
  .directive('ngEnter', function () {
    var keyBindingMap = {
      '49': 'whole', // 1
      '52': 'quarter', //4
      '56': 'eighth', //8
      '50': 'half'
    };

    return function (scope, element, attrs) {
      element.bind('keypress keydown', function (event) {
        var keyPressed = event.which;
        event.preventDefault();

        scope.$apply(function () {
          if (keyPressed === 65) { // Keypress 'a' to add selected notes to song
            scope.addNotesToSong();
          } else if (keyBindingMap[keyPressed]) { //a key that specifies duration
            scope.updateDuration(keyBindingMap[keyPressed]);
          } else if (keyPressed === 37) { //left arrow

          } else if (keyPressed === 39) { //right arrow

          } else if (keyPressed === 8) { //delete

          } else if (keyPressed === 13) { //enter

          }
        });
      });
    };
  });