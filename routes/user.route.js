const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

/* GET user. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await userService.getUsers());
  } catch (err) {
    console.error(`Error while getting user details `, err.message);
    next(err);
  }
});

/* POST user */
router.post('/instructor_create', async function(req, res, next) {
  try {
    res.json(await userService.createInstructor(req.body));
  } catch (err) {
    console.error(`Error while creating instructor`, err.message);
    next(err);
  }
});

module.exports = router;