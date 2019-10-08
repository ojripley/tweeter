$(document).ready(function() {
  $('#tweets').on('mouseover', '.tweet', function() {
    $(this).children('header').children('.username').css({ display: 'inline' });
    $(this).css({ 'box-shadow': '7px 7px #4056a1' });
  });
  $('#tweets').on('mouseleave', '.tweet', function() {
    $(this).children('header').children('.username').css({ display: 'none' });
    $(this).css({ 'box-shadow': 'none' });
  });

  
  // hover accomplishes the same thing as the above, but takes two event handler functions to make it happen on mouseover AND mouseleave
  // $('#tweets .tweet').hover(function() {
  //   $(this).children('header').children('.username').css({ display: 'inline' });
  //   $(this).css({ 'box-shadow': '7px 7px #4056a1' });
  // }, function() {
  //   $(this).children('header').children('.username').css({ display: 'none' });
  //   $(this).css({ 'box-shadow': 'none' });
  // });
});