const express = require('express');
const router = express.Router();
const moduleService = require('../services/module.service');
const authMiddleware = require('../middleware/auth.middleware')


/**
 * @swagger
 * /module/view_modules:
 *    get:
 *      description: veiw all accessible modules based on the user type
 *      responses:
 *       data:
 *         description: list of modules
 */
 router.get('/view_modules', async function(req, res, next) {
  try {
    res.json(await moduleService.getModules(req.body));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});


/**
 * @swagger
 * /module/execute_module/IMAGE_PROCESSING:
 *    get:
 *      description: execute module-IMAGE_PROCESSING
 *      responses:
 *       data:
 *         description: Whether the said module could be executed or not
 */
router.get('/execute_module/IMAGE_PROCESSING', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'IMAGE_PROCESSING'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /module/execute_module/VOICE_REC:
 *    get:
 *      description: execute module-VOICE_REC
 *      responses:
 *       data:
 *         description: Whether the said module could be executed or not
 */
router.get('/execute_module/VOICE_REC', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'VOICE_REC'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});

/**
 * @swagger
 * /module/execute_module/FACE_DETECT:
 *    get:
 *      description: execute module-FACE_DETECT
 *      responses:
 *       data:
 *         description: Whether the said module could be executed or not
 */
router.get('/execute_module/FACE_DETECT', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'FACE_DETECT'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});


module.exports = router;