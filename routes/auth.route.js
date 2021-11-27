const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');


/* POST user */
router.post('/login', async function(req, res, next) {
  try {
    console.log("auth route");
    res.json(await authService.generateToken(req.body));
  } catch (err) {
    console.error(`invalid login`, err.message);
    next(err);
  }
});

module.exports = router;