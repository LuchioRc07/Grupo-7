const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body("email").custom((value,  {req}) => {
        return db.User.findOne({ where: { email: value } })
          .then((user) => {
            if (!user || !bcrypt.compareSync(req.body.pass, user.pass)){
              return Promise.reject()
            }
          })
          .catch(() => {
            return Promise.reject("Credenciales invalidas!");
          });
      })
]