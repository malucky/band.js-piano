angular.module('pianoApp', ['ui.bootstrap'])

  .controller('PianoController', function ($scope, $modal) {
    $scope.currentNotes = {};
    $scope.currentDuration = "";
    $scope.songNotes = [];

    $scope.click = function ($event, note) {
      if ($event.target.classList.contains('selected')) {
        removeNote($event.target, note);
      } else {
        addNote($event.target, note);
      }
    };

    $scope.updateDuration = function (duration) {
      $scope.currentDuration = duration;
      $scope.$apply();
    };

    $scope.addNotesToSong = function () {
      for (var key in $scope.currentNotes) {
        $scope.currentNotes[key].classList.remove('selected');
      }
      var notes = Object.keys($scope.currentNotes).join(', ');
      var duration = $scope.currentDuration || 'quarter';
      $scope.songNotes.push([notes, duration]);
      $scope.currentNotes = [];
    };

    $scope.toJSON = function () {
      var result = {};
      result.timeSignature = [4, 4];
      result.tempo = 100;
      result.instruments = {
        rightHand: {
          name: 'square',
          pack: 'oscillators'
        }
      };
      result.notes = {
        rightHand: []
      };

      $scope.songNotes.forEach(function (note) {
        result.notes.rightHand.push({
          type: 'note',
          pitch: note[0], // Set of notes
          rhythm: note[1] // rhythm
        });
      });

      return result;
    };

    $scope.play = function() {
      var song = $scope.toJSON();
      music.load(song);
      music.end();
      music.play();
    };

    // Create new modal instance and open it 
    $scope.open = function () {
      var modalInstance = $modal.open({
        templateUrl: 'modal.html',
        controller: ModalInstanceCtrl,
        resolve: {
          json: function () {
            return $scope.toJSON();
          }
        }
      });
    };

    var addNote = function (el, note) {
      $scope.currentNotes[note] = el;
      el.classList.add('selected');
    };

    var removeNote = function (el, note) {
      delete $scope.currentNotes[note];
      el.classList.remove('selected');
    };

    var music = new BandJS();
  });


var ModalInstanceCtrl = function($scope, $modalInstance, json) {
  $scope.json = angular.toJson(json, true);
  $scope.closeModal = function () {
    $modalInstance.close();
  };
};