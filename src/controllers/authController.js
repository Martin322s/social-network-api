const router = require('express').Router();
const userService = require('../services/userService');
const cors = require('cors');

router.post('/register', cors(), async (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !gender) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json('Password should be at least 6 characters long.');
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
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json("All fields are required!");
    } else {
        try {
            const result = await userService.loginUser({ email, password });

            if (typeof result === "string") {
                throw {
                    message: "Invalid data provided!"
                }
            } else {
                const token = await userService.generateToken(result);
                res.status(200).json({
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    accessToken: token,
                    _id: result._id
                });
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
});

router.get('/logout', (req, res) => {
    if (req.headers['x-authorization']) {
        res.clearCookie('session');
        res.json();
    } else {
        res.status(401).json('Unauthorized - You don\'t have permissions to do that!');
    }
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    res.json(user);
});

router.put('/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;

    const edittedUser = await userService.updateUserProfile(userId, userData);
    res.json(edittedUser);
});

router.patch('/password/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { newPassword } = req.body;
    const user = await userService.getUserById(userId);
    const newUserData = await userService.editUserPassword(userId, newPassword, user);
    res.status(200).json({ message: 'Password changes successfully!'});
});

module.exports = router;