const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const { check } = require('express-validator');

router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 })
    ],
    authenticationController.authenticateUser
);

module.exports = router;