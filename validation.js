const Joi = require('@hapi/joi');
const registration_schema = Joi.object({
    login: Joi.string()
           .alphanum()
           .min(5)
           .max(20)
           .required(),

    name: Joi.string()
          .pattern(/^[\p{L}\p{N}]+$/u)
          .min(5)
          .max(30)
          .required(),

    pass: Joi.string()
          .pattern(/^[a-zA-Z0-9]{3,30}$/)
          .required(),

    conf_pass: Joi.ref('pass'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
        .required(),
})
    .with('pass', 'conf_pass');

module.exports = { registration_schema };
