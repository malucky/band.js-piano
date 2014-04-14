angular.module('pianoApp', [])

.controller('PianoController', function ($scope) {

  var music = new BandJS();
  $scope.currentNotes = {};
  $scope.currentDuration = "";
  $scope.songNotes = [];

  // var $notesDurationDisplay = $('.note-length');
  // var $currentNotesDisplay = $('.current-notes'); 

  $scope.addNote = function (el, note) {
    currentNotes[note] = el;
    el.classList.add('selected');
    // $currentNotesDisplay.text(Object.keys(currentNotes));
  };

  var removeNote = function (el, note) {
    delete currentNotes[note];
    el.classList.remove('selected');
    // $currentNotesDisplay.text(Object.keys(currentNotes));
  };

  $scope.click = function ($event, note) {
    if ($event.target.classList.contains('selected')) {
      removeNote($event.target, note);
    } else {
      addNote($event.target, note);
    }
  };

  $scope.keypress = function (key) {
    keyMap[key]();
  };

  // var handleKeypress = function (event) {
  //   var whichKey = event.which;

  //   if (keyMap[whichKey]) {
  //     currentNotesDuration = keyMap[whichKey];
  //     $notesDurationDisplay.text(keyMap[whichKey]);
  //     console.log($notesDurationDisplay.text());
  //   } else if (whichKey === 97) {
  //     addNotesToSong();
  //   }
  // };

  $scope.addNotesToSong = function addNotesToSong() {
    for (var key in currentNotes) {
      currentNotes[key].classList.remove('selected');
    }
    var notes = Object.keys(currentNotes).join(', ');
    songNotes.push([notes, 'quarter']);
    currentNotes = [];
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

    songNotes.forEach(function (note) {
      result.notes.rightHand.push({
        type: 'note',
        pitch: note[0], // Set of notes
        rhythm: note[1] // rhythm
      });
    });

    music.load(result);
    music.end();
    music.play();
  };

  var keyMap = {
    52: 'quarter',
    56: 'eighth',
    49: 'whole',
    65: $scope.addNotesToSong
  };
});