const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

/**
 * @swagger
 * /auth/login:
 *    post:
 *      description: Login and JWT token generation
 *      parameters:
 *        username:
 *          type: String
 *          description: name of the user is given as the username
 *        password:
 *          type: String
 *          description: password given by the admin at creation
 *      responses:
 *       token:
 *         description: JWT token of the validated user
 */


router.post('/login', async function(req, res, next) {
  try {
    res.json(await authService.generateToken(req.body));
  } catch (err) {
    console.error(`invalid login`, err.message);
    next(err);
  }
});

module.exports = router;