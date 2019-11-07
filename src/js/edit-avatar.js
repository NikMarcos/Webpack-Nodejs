import axios from 'axios';
$( document ).ready(function() {
  let imageWidth = $('img').width();
  let divWidth = parseInt( imageWidth ) - 200;
  $( '.edit' ).css( 'width', `${imageWidth}px` );
  $( '#svg' ).css( 'width', `${imageWidth}px` );



  let moving = false;
  let startPoint;
  let endX;
  let coordX;

  $( '.edit' ).mousedown(function(eventObject){
    moving = true;
    startPoint = eventObject.pageX;//
    coordX = parseInt($('#rect').attr('x'));
  });

  $( document ).mouseup(function(eventObject){
    moving = false;
    endX = parseInt( $('#rect').attr( 'x' ) );
    $('.coordX').attr('value', endX);
    console.log(endX);
  });

  $( '.edit' ).mousemove(function( e ){
    if ( moving ) {
      coordX = ( e.pageX - startPoint ) / 10 + coordX;
      if ( coordX < 0 ) {
        coordX = 0;
        startPoint = e.pageX;
      } else if( coordX > divWidth ) {
        coordX = divWidth;
        startPoint = e.pageX;
      }
      $( '#rect' ).attr( 'x', coordX );
    }
  });
});
