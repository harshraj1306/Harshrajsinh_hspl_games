$('.card').on('click', function (e) {
    $($(e.target).parents('.card')).toggleClass('flip');
  });