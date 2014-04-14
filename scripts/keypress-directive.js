/* directive to detect keypress events */
angular.module('pianoApp')
  .directive('ngEnter', function () {
    var keyBindingMap = {
      '49': 'whole', // 1
      '52': 'quarter', //4
      '56': 'eighth', //8
      '50': 'half' //2
    };

    return function (scope, element, attrs) {
      element.bind('keypress keydown', function (event) {
        var keyPressed = event.which;
        // event.preventDefault();

        scope.$apply(function () {
          switch (keyPressed) {
          case 65: //'a'
            scope.addNotesToSong();
            break;
          case 37: //'left arrow'
            //TODO: decrement the current index of the note in the song to make changes to previous notes
            break;
          case 39: //'right arrow'
            break;
          case 8: //'delete'
            break;
          case 13: //'enter'
            break;
          default:
            if (keyBindingMap[keyPressed]) { //a key that specifies duration
              scope.updateDuration(keyBindingMap[keyPressed]);
            }
          }
        });
      });
    };
  });