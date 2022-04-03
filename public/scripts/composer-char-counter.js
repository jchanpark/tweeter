$(document).ready(function() {
  let len = 140;
  let remainingCharacter;
  $('#tweet-text').on('input', function() {
    let count = $(this).val().length;
    remainingCharacter = len - count;
    $('.counter').text(remainingCharacter);
    if (remainingCharacter < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "");
    }
  });
});

