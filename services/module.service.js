const Joi = require('joi');
const db = require('./db');

// GET all modules based on user type //
async function getModules(userData) {

  const schema = Joi.object({
    username: Joi.string()
      .required(),
    type: Joi.number()
      .integer()
      .required()
  });
  const valid = await schema.validate(userData);
  if (valid.error) {
    return res.status(400).send("Bad Request");
  }

  let data = null;
  if (userData.type == 1 || userData.type == 2) {
    const rows = await db.query(
      `SELECT modulename 
            FROM class_module`
    );
    data = rows;
  }
  else {
    const rows = await db.query(
      `SELECT modulename 
            FROM class_module, student
            WHERE class_module.classname=student.classname AND student.username=(?)`,
      [
        userData.username
      ]
    );
    data = rows;

  }



  return {
    data
  }
}

// execute modules based on user type and module accessibility//
async function executeModules(userData, modulename) {

  const schema = Joi.object({
    username: Joi.string()
      .required(),
    type: Joi.number()
      .integer()
      .required()
  });
  const valid = await schema.validate(userData);
  if (valid.error) {
    return res.status(400).send("Bad Request");
  }

  let message = null;
  if (userData.type == 1 || userData.type == 2) {
    message = "Hello Module" + modulename;
    return (message);
  }
  else {
    const rows = await db.query(
      `SELECT modulename 
      FROM class_module, student
      WHERE class_module.classname=student.classname AND student.username=(?)`,
      [
        userData.username
      ]
    );
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].modulename == modulename) {
        message = "Hello Module " + modulename;
        return (message);
      }
    }
    return res.status(401).send("Unauthorized");


  }
}


  module.exports = {
    getModules,
    executeModules
  }