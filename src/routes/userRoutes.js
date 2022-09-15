const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile        = require('../middlewares/multerMiddleware');
const validations       = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware   = require('../middlewares/guestMiddleware');
const authMiddleware    = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.proccesRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.processLogin);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.perfilUsers);

// Logout
router.get('/logout/', usersController.logout);

module.exports = router;