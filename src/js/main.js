$(document).ready(function() {

// hidding popup menu and cross-gamb
  $(window).resize(function() {
    $('.add_nav_box').css('display', 'none');
    $('.gamb').removeClass('transform-gamb');
  });

// show/hide popup menu and gamb
  $('.gamb').click(function(){
    $('.gamb').toggleClass('transform-gamb');
    if ($('.add_nav_box').css('display') == 'flex'){
      $('.add_nav_box').css('display', 'none');
    } else {
      $('.add_nav_box').css('display', 'flex');
    }
  });

});
