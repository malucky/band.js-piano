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
        console.log(keyPressed);
        event.preventDefault();

        scope.$apply(function () {
          if (keyPressed === 97) { // Keypress 'a' to add selected notes to song
            scope.addNotesToSong();
          } else if (keyBindingMap[keyPressed]) { //a key that specifies duration
            scope.updateDuration(keyBindingMap[keyPressed]);
          }
        });
      });
    };
  });