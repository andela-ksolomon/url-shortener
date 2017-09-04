// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    $('#error').text('');
    $('#error').hide();
    $('#original_url').text('');
    $("#original_button").attr("href", '');
    $("#short_button").attr("href", '');
    $('#shorten_url').text('');
    var url = $('input').val();
    if(!url.length) {
      $('#error').show();
      return $('#error').text('please provide a value');
    }
    $.post('/new', { url })
      .done((data) => {
        $('.dreams').show();
        $('#original_link').text(data['original_url']);
        $("#original_button").attr("href", data['original_url'])
        $('#short_link').text(data['short_url']);
        $("#short_button").attr("href", data['short_url'])
        $('input').val('');
        // $('input').focus();        
    })
    .fail((error) => {
      $('#error').show();
      $('#error').text(error.responseJSON.error);
    });
  });

});
