const express = require('express');
const router = express.Router();
const moduleService = require('../services/module.service');
const authMiddleware = require('../middleware/auth.middleware')
const secureAuthMiddleware = require('../middleware/auth.role');


/**
 * @swagger
 * /module/view_modules:
 *    get:
 *      description: veiw all accessible modules based on the user type
 *      responses:
 *       '200':
 *            description: A successful response
 */
router.get('/view_modules', [authMiddleware, secureAuthMiddleware([1, 2, 3])], async function (req, res, next) {
  try {
    res.json(await moduleService.getModules(req.user));
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /module/execute_module/IMAGE_PROCESSING:
 *    get:
 *      description: execute module-IMAGE_PROCESSING
 *      responses:
 *       '200':
 *            description: A successful response
 */
router.get('/execute_module/IMAGE_PROCESSING', [authMiddleware, secureAuthMiddleware([1, 2, 3])], async function (req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.user, 'IMAGE_PROCESSING'));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /module/execute_module/VOICE_REC:
 *    get:
 *      description: execute module-VOICE_REC
 *      responses:
 *       '200':
 *            description: A successful response
 */
router.get('/execute_module/VOICE_REC', [authMiddleware, secureAuthMiddleware([1, 2, 3])], async function (req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.user, 'VOICE_REC'));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /module/execute_module/FACE_DETECT:
 *    get:
 *      description: execute module-FACE_DETECT
 *      responses:
 *       '200':
 *            description: A successful response
 */
router.get('/execute_module/FACE_DETECT', [authMiddleware, secureAuthMiddleware([1, 2, 3])], async function (req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.user, 'FACE_DETECT'));
  } catch (err) {
    next(err);
  }
});


module.exports = router;