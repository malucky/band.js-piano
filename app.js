angular.module('pianoApp', [])
  .controller('PianoController', function ($scope) {
    $scope.click = function (el) {
      console.log(el);
    };
  });
(function () {

  var music = new BandJS();
  var currentNotes = {};
  var currentNotesDuration = "";
  var songNotes = [];

  var keyMap = {
    '52': 'quarter',
    '56': 'eighth',
    '49': 'whole',
  };

  var $notesDurationDisplay = $('.note-length');
  var $currentNotesDisplay = $('.current-notes');


  var addNote = function (el) {
    var key = el.data('note');
    currentNotes[key] = el;
    el.addClass('selected');
    $currentNotesDisplay.text(Object.keys(currentNotes));
  };

  var removeNote = function (el) {
    var key = el.data('note');
    delete currentNotes[key];
    el.removeClass('selected');
    $currentNotesDisplay.text(Object.keys(currentNotes));
  };

  var handleKeypress = function (event) {
    var whichKey = event.which;

    if (keyMap[whichKey]) {
      currentNotesDuration = keyMap[whichKey];
      $notesDurationDisplay.text(keyMap[whichKey]);
      console.log($notesDurationDisplay.text());
    } else if (whichKey === 97) {
      addNotesToSong();
    }
  };
  var addNotesToSong = function () {
    for (var key in currentNotes) {
      currentNotes[key].removeClass('selected');
    }
    var notes = Object.keys(currentNotes).join(', ');
    songNotes.push([notes, 'quarter']);
    currentNotes = [];
  };

  var toJSON = function () {
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

  $(document).ready(function () {
    // Add or Remove song when clicked
    $('.piano').on('click', '.note', function () {
      if (this.classList.contains('selected')) {
        removeNote($(this));
      } else {
        addNote($(this));
      }
    });
    // keypress handling
    $(document).keypress(handleKeypress);
    // Display notes
    $('.add').on('click', addNotesToSong);
    $('.play').on('click', toJSON);
  });

})();