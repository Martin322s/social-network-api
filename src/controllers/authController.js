const router = require('express').Router();
const userService = require('../services/userService');
const cors = require('cors');

router.post('/register', cors(), async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !gender) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password should be at least 6 characters long.' });
    }

    if (gender !== "male" || gender !== "female") {
        return res.status(400).json({ message: "Invalid gender type" });
    }

    try {
        const result = await userService.registerUser({ firstName, lastName, email, password, gender });

        if (result._id) {
            const token = await userService.generateToken(result);

            res.status(200).json({
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                accessToken: token,
                _id: result._id
            });
        } else {
            throw {
                message: result
            }
        }
    } catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;