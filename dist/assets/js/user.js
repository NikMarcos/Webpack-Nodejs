!function(e){function n(n){for(var o,r,c=n[0],s=n[1],l=n[2],d=0,f=[];d<c.length;d++)r=c[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&f.push(a[r][0]),a[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(u&&u(n);f.length;)f.shift()();return i.push.apply(i,l||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],o=!0,c=1;c<t.length;c++){var s=t[c];0!==a[s]&&(o=!1)}o&&(i.splice(n--,1),e=r(r.s=t[0]))}return e}var o={},a={5:0},i=[];function r(n){if(o[n])return o[n].exports;var t=o[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=e,r.c=o,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=n,c=c.slice();for(var l=0;l<c.length;l++)n(c[l]);var u=s;i.push([23,0]),t()}({2:function(e,n,t){(function(e){e(document).ready((function(){e(window).resize((function(){e(".add_nav_box").css("display","none"),e(".gamb").removeClass("transform-gamb")})),e(".gamb").click((function(){e(".gamb").toggleClass("transform-gamb"),"flex"==e(".add_nav_box").css("display")?e(".add_nav_box").css("display","none"):e(".add_nav_box").css("display","flex")}))}))}).call(this,t(5))},23:function(e,n,t){"use strict";t.r(n);t(24),t(2),t(25),t(3)},24:function(e,n,t){(function(e,n){e(document).ready((function(){e(".images > img").dblclick((function(){e(".images_popup").css({opacity:"1","z-index":"100"})}));var t=e(".image_container");e(".change").click((function(){e(this).attr("disabled",!0),e(t).each((function(n){var t=e(this).data("userid"),o=e(this).data("imagename"),a="<form action=\"/image/cut/\", method=\"post\">\n      <input type='hidden' name='id' value=".concat(t,">\n      <input type='hidden' name='imageName' value=").concat(o,">\n      <input type='submit' value='Новый аватар'>\n      </form>");e(this).append(a)})),e(".images_popup").css({opacity:"1","z-index":"100"})})),e(".images_popup > .cross").click((function(){e(".change").attr("disabled",!1),e(".images_popup").css({opacity:"0","z-index":"-1"}),e(".images_popup form").fadeOut(1e3,(function(){e(".images_popup form").remove()}))})),e(".image_container").on("click",".delete",(function(n){var t=e(this).parent().data("userid"),o=e(this).parent().data("imagename"),a=e(this).parent().data("imageid"),i={method:"POST",body:JSON.stringify({imageName:o,imageId:a,id:t}),headers:{"Content-Type":"application/json"}};fetch("/image/delete",i).then((function(e){return e.json()})).then((function(e){console.log(1==e.ok),e.ok&&location.reload(!0)}))})),e("#imageBtn").click((function(t){t.preventDefault();var o=e(".id").val(),a=document.getElementById("imageFile").files[0];console.log(a);var i=new n;i.append("file",a),i.append("id",o),fetch("http://localhost:3000/image/save",{method:"POST",body:i})}));var o=0;e(".friends .friendsTitle").click((function(n){console.log(o),0==o?(e(".svgCircle").attr("r","1000px"),o++):(e(".svgCircle").attr("r","50px"),o=0)})),e(".addUserBtn").click((function(n){n.preventDefault();var t=JSON.parse(localStorage.getItem("friends")),o=e(".addUser").val();if(t.includes(o)){var a={method:"POST",body:JSON.stringify({userLogin:o}),headers:{"Content-Type":"application/json"}};fetch("/user/deleteFriend",a).then((function(e){return e.json()})).then((function(e){if(1==e.ok){var n=JSON.parse(localStorage.getItem("friends")).filter((function(e){return e!=o}));localStorage.setItem("friends",JSON.stringify(n)),avatarBtn.html("Добавить в друзья")}})).catch((function(e){console.log(err)}))}else{var i={method:"POST",body:JSON.stringify({userLogin:o}),headers:{"Content-Type":"application/json"}};fetch("/user/add",i).then((function(e){return e.json()})).then((function(e){1==e.ok&&(t.push(pageOwner),localStorage.setItem("friends",JSON.stringify(t)),avatarBtn.html("Удалить из друзей"))})).catch((function(e){console.log(err)}))}}))}))}).call(this,t(5),t(6))},25:function(e,n,t){var o=t(26);"string"==typeof o&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};t(1)(o,a);o.locals&&(e.exports=o.locals)},26:function(e,n,t){},3:function(e,n,t){var o=t(4);"string"==typeof o&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};t(1)(o,a);o.locals&&(e.exports=o.locals)},4:function(e,n,t){}});