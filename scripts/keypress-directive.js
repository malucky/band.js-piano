angular.module('pianoApp')
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 65) { // Keypress 'a'
          scope.keypress(event.which);
          event.preventDefault();
        }
      });
    };
  });