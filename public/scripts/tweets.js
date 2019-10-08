$(document).ready(function() {
  $('.tweet').on('mouseover', function() {
    $('.username').css({ display: 'inline' });
  });
  $('.tweet').on('mouseleave', function() {
    $('.username').css({ display: 'none' });
  });
});