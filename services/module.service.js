const Joi = require('joi');
const db = require('./db');

// GET all users //
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
    throw new Error('Validation Error');
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
    throw new Error('Validation Error');
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
        message = "Hello Module" + modulename;
        return (message);
      }
    }
    throw new Error('401 Error');


  }
}


  module.exports = {
    getModules,
    executeModules
  }