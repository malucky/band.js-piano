angular.module('pianoApp', ['ui.bootstrap'])

.controller('PianoController', function ($scope, $modal) {
  $scope.currentNotes = {};
  $scope.currentDuration = "";
  $scope.songNotes = [];

  $scope.currentIndex = 0;

  /* Toggle the key. Takes in $event and a string representation for the note's pitch*/
  $scope.click = function ($event, note) {
    if ($event.target.classList.contains('selected')) {
      removeNote($event.target, note);
    } else {
      addNote($event.target, note);
    }
  };

  /* Update the duration of current note (i.e. 'quarter', 'whole', 'eighth' note) */
  $scope.updateDuration = function (duration) {
    $scope.currentDuration = duration;
  };

  /* Add the current notes to the actual song with the indicated duration*/
  $scope.addNotesToSong = function () {
    //if no notes were selected, return
    if (Object.keys($scope.currentNotes).length < 1) {
      return;
    }

    //update the pointer to the current note
    $scope.currentIndex = $scope.songNotes.length;

    //unhighlight the selected keys
    for (var key in $scope.currentNotes) {
      $scope.currentNotes[key].classList.remove('selected');
    }

    var notes = Object.keys($scope.currentNotes).join(', ');

    //defaults to 'quarter'
    var duration = $scope.currentDuration || 'quarter';
    $scope.songNotes.push([notes, duration]);
    $scope.currentNotes = [];
  };

  //create the json representation for bandjs with a set of defaults (will implement these options and customization)
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
    console.log($scope.songNotes);

    return result;
  };

  /* play the song through bandjs */
  $scope.play = function () {
    var song = $scope.toJSON();
    music.load(song);
    music.end();
    music.play();
  };

  /* Create new modal instance and open it */
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

  /* helper to add a note to the current notes */
  var addNote = function (el, note) {
    $scope.currentNotes[note] = el;
    el.classList.add('selected');
  };

  /* helper to remove a note to the current notes */
  var removeNote = function (el, note) {
    delete $scope.currentNotes[note];
    el.classList.remove('selected');
  };

  var music = new BandJS();
});


var ModalInstanceCtrl = function ($scope, $modalInstance, json) {
  $scope.json = angular.toJson(json, true);
  $scope.closeModal = function () {
    $modalInstance.close();
  };
};