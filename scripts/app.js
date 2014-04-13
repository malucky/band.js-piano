(function() {

  var currentNotes = {};

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

  var displayNotes = function() {
    for(var key in currentNotes) {
      currentNotes[key].removeClass('selected');
    }
    console.log(Object.keys(currentNotes));
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
    $('button').on('click', displayNotes);
  });

})();
