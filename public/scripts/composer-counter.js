// document ready function lets us know when the DOM has loaded
$(document).ready(function() {
  $('#textarea').on('input', function() {

    // determine number of characters remaining
    let remaining = (140 - $(this).val().length);

    // render updated count
    // count is accessed via the DOM tree, using the previously found textarea (this) as a starting point
    $(this).siblings('.counter').text(remaining);
    
    // change colour if no characters left
    if (remaining < 0) {
      $(this).siblings('.counter').css({ color: 'red' });
    } else {
      $(this).siblings('.counter').css({ color: '#545149' });
    }
  });
});