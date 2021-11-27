const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');


/**
 * @swagger
 * /user/:
 *    get:
 *      description: Use to return all customers
 *    responses:
 *      '201':
 *        description: Successfully created user
 */

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