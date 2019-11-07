const express = require('express');
const router = express.Router();
const { createUser } = require('../queries');
const Joi = require('@hapi/joi');
const { registration_schema } = require('../validation');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('signup');
});

/* User registration */
router.post('/',  async (req, res, next) => {
  let data = req.body;
  const { error, value } = await registration_schema.validate(data);
  console.log(error);
  if(!error) {
    let login = req.body.login;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.pass;
    // let confPass = req.body.conf_pass;
    const saltRounds = 5;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(password, salt);
    let userData = new User({ login, name, email, password: hashPassword });

    userData.save().then((resp) => {
      if( resp ) {
        res.render('signin', {flash: "Вы успешно зарегестрированы. Пожалуйста, авторизуйтесь."});
      } else {
        console.log("Ошибка: " + resp);
        res.render('signup', {flash: "Пользователь с таким логином уже существует. Пожалуйста, придумайте другой логин"});
      }
    });
  } else {
    res.render('signup', {flash: "Пароли не совпадают"});
  }
});

module.exports = router;