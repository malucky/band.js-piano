angular.module('pianoApp')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        var keyPressed = event.which;
        if (keyPressed === 97) { // Keypress 'a'
          scope.addNote(event.which);
          event.preventDefault();
        }
      });
    };
  });