$(document).ready(function() {
  // $('.tweet').on('mouseover', function() {
  //   $(this).children('header').children('.username').css({ display: 'inline' });
  //   $(this).css({ 'box-shadow': '7px 7px #4056a1' });
  // });
  // $('.tweet').on('mouseleave', function() {
  //   $(this).children('header').children('.username').css({ display: 'none' });
  //   $(this).css({ 'box-shadow': 'none' });
  // });

  
  // hover accomplishes the same thing as the above, but takes two event handler functions to make it happen on mouseover AND mouseleave
  $('.tweet').hover(function() {
    $(this).children('header').children('.username').css({ display: 'inline' });
    $(this).css({ 'box-shadow': '7px 7px #4056a1' });
  }, function() {
    $(this).children('header').children('.username').css({ display: 'none' });
    $(this).css({ 'box-shadow': 'none' });
  });
});