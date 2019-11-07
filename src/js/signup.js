$(document).ready(function() {
  let authForm = $('.auth_form');
  let regForm = $('reg_form');
  let opacityAuth = $('.toggle_opacity_auth');
  let opacityReg = $('.toggle_opacity_reg');

  opacityReg.click((e) => {
    authForm
      .animate({opacity: 0}, 1000, () => {
        authForm.css('zIndex', -1)
      });
  });

  opacityAuth.click((e) => {
    authForm
      .animate({zIndex: 1}, 1000)
      .animate({opacity: 1}, 1000);
    });
  });
