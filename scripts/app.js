(function() {

  var music = new BandJS();
  var currentNotes = {};
  var songNotes = [];

  var addNote = function(el) {
    var key = el.data('note');
    currentNotes[key] = el;
    el.addClass('selected');
  };

  var removeNote = function(el) {
    var key = el.data('note');
    delete currentNotes[key];
    el.removeClass('selected');
  };

  var addNotesToSong = function() {
    for(var key in currentNotes) {
      currentNotes[key].removeClass('selected');
    }
    var notes = Object.keys(currentNotes).join(', ');
    songNotes.push([notes, 'quarter']);
  };

  var toJSON = function() {
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

    songNotes.forEach(function(note) {
      result.notes.rightHand.push({
        type: 'note',
        pitch: note[0],
        rhythm: note[1]
      });
    });

    music.load(result);
    music.end();
    music.play();
  };

  $(document).ready(function() {
    // Add or Remove song when clicked
    $('.piano').on('click', '.note', function() {
      if(this.classList.contains('selected')) {
        removeNote($(this));
      } else {
        addNote($(this));
      }
    });
    // Display notes
    $('.add').on('click', addNotesToSong);
    $('.play').on('click', toJSON);
    toJSON();
  });

})();
