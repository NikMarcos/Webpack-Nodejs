$(document).ready(function() {
  let usersList = $('.users');
  $('.usersSearch').keyup(function(){
    let userName = $('.usersSearch').val();
    if (userName.length >= 3) {
      let options = {
        method: 'POST',
        body: JSON.stringify({ userName }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/users/', options)
      .then(response => response.json())
      .then(response => {
        if (response) {
          console.log(response);
          console.log(typeof response);
          let users = response;
              foundUsers = '';
          for (let user of users){
            let src = user.images.length ? `/images/${user.images[0].file}` : '/assets/images/inkognito.jpg';
                name = user.name;
                email = user.email;
                login = user.login;
            let userData =
            `<div class='user'>
              <div class='avatar'>
                <img class='first_img' src=${src} alt='Аватар'>
              </div>
              <div class='person'>
                <strong>Имя: ${name}</strong>
                <br>
                <strong>Почта: ${email}</strong>
              </div>
              <div class='to_acc'>
                <a href='/user/'${login}>Перейти</a>
              </div>
            </div>`;
            foundUsers += userData;
          }
          usersList.empty();
          usersList.html(foundUsers);
          console.log(foundUsers);
        }
      })
      .catch((error) => {
        console.log(error);
      })


    }

  });

})
