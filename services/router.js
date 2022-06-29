const express = require('express');
const router = new express.Router();
const users = require('../controllers/users.js');
const badges = require('../controllers/badges.js');
const comments = require('../controllers/comments.js');
const linktypes = require('../controllers/linktypes.js');
const postlinks = require('../controllers/postlinks.js');
const posts = require('../controllers/posts.js');
const posttypes = require('../controllers/posttypes.js');
const votes = require('../controllers/votes.js');
const votetypes = require('../controllers/votetypes.js');

router.route('/users/:id?')
    .get(users.get);

router.route('/badges/:id?')
    .get(badges.get);

router.route('/comments/:id?')
    .get(comments.get);

router.route('/comments')
    .post(comments.post);

router.route('/comments/:id?')
    .put(comments.put);

router.route('/comments/:id?')
    .delete(comments.del);

router.route('/linktypes/:id?')
    .get(linktypes.get);

router.route('/postlinks/:id?')
    .get(postlinks.get);

router.route('/posts/:id?')
    .get(posts.get);

router.route('/posttypes/:id?')
    .get(posttypes.get);

router.route('/votes/:id?')
    .get(votes.get);

router.route('/votetypes/:id?')
    .get(votetypes.get);

module.exports = router; 