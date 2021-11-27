const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const authMiddleware = require('../middleware/auth.middleware');
const secureAuthMiddleware = require('../middleware/auth.role');


/**
 * @swagger
 * /user/instructor_create:
 *    post:
 *      description: create new instructor user
 *      parameters:
 *        username:
 *          type: String
 *          description: name of the instructor
 *      responses:
 *       password:
 *         description: randomly generated password for the newly created instructor
 */

router.post('/instructor_create', [authMiddleware, secureAuthMiddleware([1])], async function (req, res, next) {
  console.log(req.user);
  try {
    res.json(await userService.createInstructor(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;