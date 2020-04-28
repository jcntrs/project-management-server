const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' });
        } else {
            const correctPassword = await bcryptjs.compare(password, user.password);
            if (!correctPassword) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            } else {
                const payload = {
                    user: {
                        userId: user.id
                    }
                };
                jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 3600
                }, (error, token) => {
                    if (error) throw error;
                    res.json({ token });
                });
            }
        }
    } catch (error) {
        console.log(error)
    }

}

exports.getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' });
    }
}