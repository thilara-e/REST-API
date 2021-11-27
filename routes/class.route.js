const express = require('express');
const router = express.Router();
const classService = require('../services/class.service');
const authMiddleware = require('../middleware/auth.middleware')


/**
 * @swagger
 * /class/class_create:
 *    post:
 *      description: Login and JWT token generation
 *      parameters:
 *        classname:
 *          type: String
 *          description: name of the class to be created
 *        modules:
 *          type: list of Strings
 *          description: list of module enums selected for each class
 *        students:
 *          type: list of Strings
 *          description: list of student names that are taking the class
 *      responses:
 *          password:
 *            description: randomly generated common password for all the students taking the class
 */
 router.post('/class_create', async function(req, res, next) {
   
  try {
    res.json(await classService.createClass(req.body));
  } catch (err) {
    console.error(`Error while creating class`, err.message);
    next(err);
  }
});

module.exports = router;