const express = require('express');
const router = new express.Router();
const users = require('../controllers/users.js');
const badges = require('../controllers/badges.js');
const comments = require('../controllers/comments.js');
const linktypes = require('../controllers/linktypes.js');
const postlinks = require('../controllers/postlinks.js');
const posts = require('../controllers/posts.js');

router.route('/users/:id?')
    .get(users.get);

router.route('/badges/:id?')
    .get(badges.get);

router.route('/comments/:id?')
    .get(comments.get);

router.route('/linktypes/:id?')
    .get(linktypes.get);

router.route('/postlinks/:id?')
    .get(postlinks.get);

router.route('/posts/:id?')
    .get(posts.get);

module.exports = router;