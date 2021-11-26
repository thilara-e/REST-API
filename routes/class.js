const express = require('express');
const router = express.Router();
const classService = require('../services/classService');

/* POST class */
router.post('/class_create', async function(req, res, next) {
  try {
    res.json(await classService.createClass(req.body));
  } catch (err) {
    console.error(`Error while creating class`, err.message);
    next(err);
  }
});

module.exports = router;