const User = require('../models/User');

exports.createUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuario ya existe' });
        } else {
            user = new User(req.body);
            await user.save();
            res.json({ msg: 'Usuario creado exitosamente' });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error');
    }

}