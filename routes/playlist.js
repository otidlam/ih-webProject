"use strict";

const express = require('express');
const router = express.Router();

/* GET playlist new page. */
router.get('/new', function(req, res, next) {
  res.render('playlist/new');
});

module.exports = router;
