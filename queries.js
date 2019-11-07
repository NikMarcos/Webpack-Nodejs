// var express = require('express');
// var app = express();
const bcrypt = require('bcrypt');


const getUsers = (db) => {
  return new Promise(function (resolve, reject){
    const collection = db.collection(process.env.DB_COLLECTION_USERS);
    collection.find({}).toArray(function (err, result) {
      if (err) {
        reject('Error');
      }
      resolve(result);
    })
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
}

const getUserByLogin = (db, raw_login) => {
  let login = raw_login;
  return new Promise((resolve, reject) => {
    const collection = db.collection(process.env.DB_COLLECTION_USERS);
    collection.find({login: login}).toArray(function (err, result) {
      if (err) {
        throw error
        reject(0);
      }
      resolve(result);
    });

  // })
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
};

const findUser = (email, pass) => {
  let password = pass;
  // let email = email;
  return new Promise(function (resolve, reject){
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
      if (error) {
        throw error
        reject(0);
      } else {
        let res = result.rows;
        if (res.length > 0) {
          console.log(result.rows);
          let arrUsers = result.rows;
          let passField = arrUsers[0]['password'];
          let isPassword = bcrypt.compareSync(password, passField);
          if (isPassword) {
            resolve(result.rows);
          } else {
            reject(0);
          }
        } else {
          reject(0);
        }
      }
    })
  });
};

const createUser = (db, raw_login, raw_name, raw_email, raw_password) => {
  let login = raw_login;
  let name = raw_name;
  let email = raw_email;
  let password = raw_password;

  const saltRounds = 5;
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashPassword = bcrypt.hashSync(password, salt);
  return new Promise((resolve, reject) => {
    const collection = db.collection(process.env.DB_COLLECTION_USERS);
      collection.insertOne({
        login: login, name: name, email: email, password: hashPassword
      }, function (err, response) {
        if (err) {
          reject(err);
        } else {
          resolve('OK');
        }
      });
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
}

const updateImage = (db, login, image) => {
  return new Promise(function (resolve, reject){
    const collection = db.collection(process.env.DB_COLLECTION_IMAGES);
    collection.updateOne(
      { login : login, isAvatar : 'on' },
      { $set: {isAvatar: false }},
      function (err, response) {
      if ( err ) {
        reject(err);
      }
      collection.updateOne(
        { login : login, file : image },
        { $set: {isAvatar: 'on' }},
        function (err, response) {
        if ( err ) {
          reject(err);
        }
        resolve('OK');
      })
    })
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
};

const updateUser = (id, name, email) => {
  // const id = parseInt(request.params.id)
  // const { name, email } = request.body
  return new Promise(function (resolve, reject){
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[name, email, id], (error, results) => {
      if (error) {
        throw error
        reject(0);
      }
      resolve('OK');
    })
  });
}

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)
//
//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

const saveImage = (db, userLogin, filename, isAvatar = 'false') => {
  return new Promise(function (resolve, reject){
    const collection = db.collection(process.env.DB_COLLECTION_IMAGES);
    collection.insertOne({
      login: userLogin, file: filename, isAvatar: isAvatar
    }, function (err, response) {
      if (err) {
        reject(err);
      } else {
        resolve('OK');
      }
    });
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
}

const getImagesByUserLogin = (db, userLogin) => {
  let login = userLogin;
  return new Promise((resolve, reject) => {
    const collection = db.collection(process.env.DB_COLLECTION_IMAGES);
    collection.find({login: login}).toArray(function (err, result) {
      if (err) {
        throw error
        reject(0);
      }
      resolve(result);
    });

  // })
  }).catch((err) => {
    console.log('\x1b[36m%s\x1b[0m', err.errmsg);
    return 'Error';
  })
};

module.exports = {
  updateImage,
  getUsers,
  getUserByLogin,
  createUser,
  updateUser,
  findUser,
  // deleteUser,
  saveImage,
  getImagesByUserLogin
}
