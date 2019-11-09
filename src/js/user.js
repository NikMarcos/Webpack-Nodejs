// import axios from 'axios';
// import FormData from 'form-data'

$(document).ready(function() {

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }



  let getFriends = (currentUserLogin) => {
    let options = {
      method: 'POST',
      body: JSON.stringify({ currentUserLogin }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/user/friends', options)
    .then(response => response.json())
    .then(json => {
      localStorage.setItem('friends', JSON.stringify(json.friends));
    })
    .catch((error) => {
      console.log(err);
    })
  }

  let currentUserLogin = getCookie('userLogin');
  let pageOwner = $('.login').data('login');
  let avatarBtn = $('.avaBtnStyle');
  if(currentUserLogin == pageOwner) {
    getFriends(currentUserLogin);
  } else {
    let friendsArray = JSON.parse(localStorage.getItem('friends'));
    if(friendsArray.includes(pageOwner)){
      avatarBtn.html('Удалить из друзей');
    }
  }


  $('.images > img').dblclick(function(){
    $('.images_popup').css({'opacity': '1', 'z-index': '100'});
  });

  let images = $( '.image_container' );
  $('.change').click(function(){
    $(this).attr("disabled", true);
    $( images ).each(function( index ) {
      let userId = $( this ).data( "userid" );
      let imageFile = $( this ).data( "imagename" );
      let html = `<form action="/image/cut/", method="post">
      <input type='hidden' name='id' value=${userId}>
      <input type='hidden' name='imageName' value=${imageFile}>
      <input type='submit' value='Новый аватар'>
      </form>`;
      $( this ).append( html );
    });
    $( '.images_popup' ).css({ 'opacity': '1', 'z-index': '100'});

  })

  $('.images_popup > .cross').click(function(){
    $( '.change' ).attr( "disabled", false );
    $( '.images_popup' ).css({ 'opacity': '0', 'z-index': '-1'});
    $( ".images_popup form" ).fadeOut( 1000, () => {
      $( ".images_popup form" ).remove();
    });
  })

  $( '.image_container' ).on('click', '.delete', function(e) {
    let id = $(this).parent().data('userid');
    let imageName = $(this).parent().data('imagename');
    let imageId = $(this).parent().data('imageid');
    const options = {
      method: 'POST',
      body: JSON.stringify({ imageName, imageId, id }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/image/delete', options)
    .then(response => response.json())
    .then(json => {
      console.log(json.ok == 1);
      if (json.ok) {
        location.reload(true);
      }

    });
  })

  $( '#imageBtn' ).click((e) => {
    e.preventDefault();
    let id = $( '.id' ).val();
    let image = document.getElementById( 'imageFile' ).files[0];
    console.log( image );
    const data = new FormData();
    data.append( 'file', image );
    data.append( 'id', id );
    const options = {
      method: 'POST',
      body: data,
      // headers: {
      //   'Content-Type': 'application/json'
      //   'Content-Type': 'multipart/form-data'
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
    };
    fetch('http://localhost:3000/image/save', options);
  })

  let typeFriendsBtn = 0;
  $( '.friends .friendsTitle' ).click((e) => {
    console.log(typeFriendsBtn);
    if(typeFriendsBtn == 0) {

      $( '.svgCircle' ).attr( 'r', '1000px' );
      typeFriendsBtn++;
    } else {
      $( '.svgCircle' ).attr( 'r', '50px' );
      typeFriendsBtn = 0;
    }
  })

  $( '.addUserBtn' ).click((e) => {
    e.preventDefault();
    let friendsArray = JSON.parse(localStorage.getItem('friends'));
    let userLogin = $( '.addUser' ).val();
    let statusFriend = friendsArray.includes(userLogin);
    if(!statusFriend){

      let options = {
        method: 'POST',
        body: JSON.stringify({ userLogin }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch('/user/add', options)
      .then(response => response.json())
      .then(json => {
        if (json.ok == 1) {

          friendsArray.push(pageOwner)
          localStorage.setItem('friends', JSON.stringify(friendsArray));
          avatarBtn.html('Удалить из друзей');
        }
      })
      .catch((error) => {
        console.log(err);
      })
    } else {
      let options = {
        method: 'POST',
        body: JSON.stringify({ userLogin }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch('/user/deleteFriend', options)
      .then(response => response.json())
      .then(json => {
        if (json.ok == 1) {
          let friendsArray = JSON.parse(localStorage.getItem('friends'));
          let filteredFriends = friendsArray.filter(function(elem){
            return elem != userLogin;
          });
          localStorage.setItem('friends', JSON.stringify(filteredFriends));
          avatarBtn.html('Добавить в друзья');
        }
      })
      .catch((error) => {
        console.log(err);
      })
    }
  })
});
