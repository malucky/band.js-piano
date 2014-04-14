(function () {

  var currentNotes = {};
  var currentNotesDuration = "";

  var keyMap = {
    '52': 'quarter',
    '56': 'eighth',
    '49': 'whole'
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

  var submitNotes = function () {
    if (Object.keys(currentNotes).length && currentNotesDuration) { //if there are notes and a duration is specified
      for (var key in currentNotes) {
        currentNotes[key].removeClass('selected');
      }
      console.log(Object.keys(currentNotes));
      $notesDurationDisplay.text("");
      $currentNotesDisplay.text("");
    }
  };

  var handleKeypress = function (event) {
    var whichKey = event.which;

    if (keyMap[whichKey]) {
      currentNotesDuration = keyMap[whichKey];
      $notesDurationDisplay.text(keyMap[whichKey]);
      console.log($notesDurationDisplay.text());
    } else if (whichKey === 13) { //enter
      submitNotes();
    }
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
  });

})();