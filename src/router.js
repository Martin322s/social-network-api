const router = require('express').Router();

const authController = require('./controllers/authController');
const publicationController = require('./controllers/publicationController');
const commentsController = require('./controllers/commentsController');

router.use('/users', authController);
router.use('/publications', publicationController);
router.use('/comments', commentsController);

module.exports = router;