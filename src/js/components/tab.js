$('.js-new-game').on('click', function() {
  $('.js-archive').removeClass('underline');
  $(this).addClass('underline');
  $('#archive').removeClass('is-show');
  $('#new-game').addClass('is-show');
});

$('.js-archive').on('click', function() {
  $('.js-new-game').removeClass('underline');
  $(this).addClass('underline');
  $('#new-game').removeClass('is-show');
  $('#archive').addClass('is-show');
});