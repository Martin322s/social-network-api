const router = require('express').Router();

router.post('/create', (req, res) => {
    const { opinion, file, userId } = req.body;
    const databaseData = {
        content: opinion,
        image: file,
        likes: 0,
        dislikes: 0,
        author: userId,
        comments: []
    };
    console.log(databaseData);
});

module.exports = router;