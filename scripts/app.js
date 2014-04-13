(function() {

  var currentNotes = [];

  $(document).ready(function() {
    $('.piano').on('click', '.note', function() {
      currentNotes.push($(this));
      $(this).addClass('selected');
    });

    $('button').on('click', function() {
      currentNotes.forEach(function(node) {
        console.log(node.data('note'));
        node.removeClass('selected');
      });
      currentNotes = [];
    });
  });
})();