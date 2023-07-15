const router = require('express').Router();
const postService = require('../services/publicationService');

router.post('/create', async (req, res) => {
    const { opinion, file, userId } = req.body;
    const databaseData = {
        content: opinion,
        image: file,
        likes: 0,
        dislikes: 0,
        author: userId,
        comments: []
    };
    
    const newPublicaion = await postService.createPublication(databaseData);
    res.json(newPublicaion);
});

router.get('/all', async (req, res) => {
    const allPosts = await postService.getAll();
    res.json(allPosts);
});

module.exports = router;