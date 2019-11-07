var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const qs = require('querystring');
const { images } = require('../models/images.js');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const im = require('imagemagick');
const Jimp = require('jimp');
const fs = require('fs');

const srcImage = './uploads/images/';
const desPath = './uploads/images/small/';


let storage = multer.diskStorage({
  destination: 'uploads/images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

let upload = multer({ storage: storage }).single('image');

router.post('/save', function(req, res) {
  upload(req, res, function () {
    if(req.file) {
      let login = req.session.userLogin;
      let id = req.body.id;
      let file = req.file.filename;

      let imageData = new images({ owner: id, file });
        imageData.save().then((img)=>{
          if (img) {
            User.updateOne({ _id: id }, { $push: { images: img._id } })
            .then((resp) => {
              res.redirect(`/user/${login}`);
            });
          } else {
            res.redirect(`/user/${login}`);
          }
        }).catch(function(e) {
          console.log(e);
          res.redirect(`/user/${login}`);
        });
    } else {
      res.redirect(`/`);
    }
  });
});

router.post('/cut/', function(req, res) {
    let login = req.session.userLogin;
    let file = req.body.imageName;
    let id = req.body.id;
    console.log(req.body);
    if( file && login ) {
      fs.access(desPath + file, fs.constants.F_OK, err => {
        // console.log(err ? "Doesn't exist" : "Exist");

        // var image = new Jimp(srcImage + file, function (err, image) {
        //     var w = image.bitmap.width; // the width of the image
        //     var h = image.bitmap.height; // the height of the image
        //     let fraction = w / h;
        //     if (fraction < 1) {
        //       console.log('less');
        //     }
        // });

        if (err) {

          Jimp.read(srcImage + file)
          .then(image => {
            var w = image.bitmap.width; // the width of the image
            var h = image.bitmap.height; // the height of the image
            let fraction = w / h;
            if (fraction < 1) {
              console.log('less');
              //////////////////// Если ширина меньше высоты /////////////////
              Jimp.read(srcImage + file)  // read
              .then(rawImage => {
                return rawImage
                  .clone()                // clone image
                  .resize(Jimp.AUTO, 200) // resize
                  .write(desPath + file); // save
              })
              .then(changeStatus => {
                images.updateOne({ owner: id, isAvatar: true }, { $set: { isAvatar: false } })
                .then((resp) => {
                  images.updateOne({ file, owner: id}, { $set: { isAvatar: true } })
                  .then(( response )=>{
                    if ( response ) {
                      res.redirect( `/user/${login}` );
                    } else {
                      res.redirect( `/user/${login}` );
                    }
                  });
                }).catch(function(e) {
                  console.log(e);
                  res.redirect( `/user/${login}` );
                });
              })
              .catch(err => {
                console.error(err);
              });
            } else {
              ///////// Если ширина больше высоты ////////////
              images.find({ owner: id, file})
              .then(( resp ) => {
                console.log(resp);
                res.render( 'edit-avatar', { title: 'Express me', user: id , image: resp[0].file });
              })
              .catch( function(e) {
                  console.log(e);
                  res.redirect( `/user/${login}` );
              });

            }
          })
          .catch(err => {
            console.log(err);
          });

        } else {
          images.updateOne({ owner: id, isAvatar: true }, { $set: { isAvatar: false } })
          .then((resp) => {
            images.updateOne({ file, owner: id}, { $set: { isAvatar: true } })
            .then(( response )=>{
              if ( response ) {
                res.redirect( `/user/${login}` );
              } else {
                res.redirect( `/user/${login}` );
              }
            });
          }).catch(function(e) {
            console.log(e);
            res.redirect( `/user/${login}` );
          });
        }
      });
      } else {
        res.redirect( `/` );
      }
    });


router.post('/update/', function(req, res) {
    let login = req.session.userLogin;
    let file = req.body.image;
    let coordX = parseInt(req.body.coordX);
    let id = req.body.id;

    if( file && login ) {

      Jimp.read(srcImage + file)  // read
      .then(rawImage => {
        return rawImage
          .clone()                // clone image
          .resize(Jimp.AUTO, 200) // resize
          .crop(coordX, 0, 200, 200) // cut
          .write(desPath + file); // save
      })
      .catch(err => {
        console.error(err);
      });

        images.updateOne({ owner: id, isAvatar: true }, { $set: { isAvatar: false } })
        .then((resp) => {
          images.updateOne({ file, owner: id}, { $set: { isAvatar: true } })
          .then(( response )=>{
            if ( response ) {
              res.redirect( `/user/${login}` );
            } else {
              res.redirect( `/user/${login}` );
            }
          });
        }).catch(function(e) {
          console.log(e);
          res.redirect( `/user/${login}` );
        });
      } else {
        res.redirect( `/` );
      }
    });

    router.post('/delete/', function(req, res) {
      let id = req.body.id;
      let image_id = req.body.imageId;
      let image_name = req.body.imageName;
      console.log(req.body);
      User.updateOne({ _id: id }, { $pull: { images: image_id } })
      .then((result) => {
        images.deleteOne({owner: id, _id: image_id})
        .then((result) => {
          // Удаления изображения с сервера
          let largeImagePath = srcImage + image_name;
          let smallImagePath = desPath + image_name;
          fs.unlinkSync(largeImagePath);
          fs.unlinkSync(smallImagePath);
          res.json(result);
        });
      })
      .catch((err) => {
        console.log(err);
      })
    });


// router.get('/getImage/:login', function(req, res) {
//   let rawLogin = req.body.login.trim().toLowerCase();
//   getImagesByUserLogin(req.app.locals.db, rawLogin).then((resp)=>{
//
//   });
//
// });

module.exports = router;
