const express = require('express');
const router = express.Router();
const moduleService = require('../services/module.service');

/* GET user. */
router.get('/view_modules', async function(req, res, next) {
  try {
    res.json(await moduleService.getModules(req.body));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});


/* GET user. */
router.get('/execute_module/IMAGE_PROCESSING', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'IMAGE_PROCESSING'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});

router.get('/execute_module/VOICE_REC', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'VOICE_REC'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});

router.get('/execute_module/FACE_DETECT', async function(req, res, next) {
  try {
    res.json(await moduleService.executeModules(req.body,'FACE_DETECT'));
  } catch (err) {
    console.error(`Error while getting module details `, err.message);
    next(err);
  }
});


module.exports = router;