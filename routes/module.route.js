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



module.exports = router;