const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Quando alguém acessar /api/auth/registrar, chama a função de registrar
router.post('/registrar', authController.registrar);

// Quando alguém acessar /api/auth/login, chama a função de login
router.post('/login', authController.login);

module.exports = router;