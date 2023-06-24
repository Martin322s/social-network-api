const router = require('express').Router();
const userService = require('../services/userService');
const cors = require('cors');

router.post('/register', cors(), async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;
    console.log({ firstName, lastName, email, password, gender });

    if (!firstName || !lastName || !email || !password || !gender) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password should be at least 6 characters long.' });
    }

    try {
        const result = await userService.registerUser({ firstName, lastName, email, password, gender });
        console.log(result);
    } catch(err) {

    }
});

module.exports = router;