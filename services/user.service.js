const db = require('./db');
const randomPasswordGenerator = require('secure-random-password');
const Joi = require('joi');
const bcrypt = require('bcryptjs');



// CREATE instructor //
async function createInstructor(instructor) {
  //Validating the endpoint requests
  const schema = Joi.object({
    username: Joi.string()
      .required(),

  });
  const valid = await schema.validate(instructor);
  if (valid.error) {
    const error = new Error(valid.error.message);
    error.statusCode = 400;
    throw error;
  }
  //random password generation
  const password = randomPasswordGenerator.randomPassword();
  const bcryptPassword = await bcrypt.hash(password, 8);

  try {
    let result = await db.query(
      `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 2)`,
      [
        instructor.username, bcryptPassword
      ]
    );
  }
  catch (err) {
    const error = new Error(err.sqlMessage);
    error.statusCode = 400;
    throw error;
  }


  return { password };
}

// CREATE student //
async function createStudent(student) {
  //validating the endpoint requests
  const schema = Joi.object({
    username: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
    classname: Joi.string()
      .required(),

  });
  const valid = await schema.validate(student);
  if (valid.error) {
    const error = new Error(valid.error.message);
    error.statusCode = 400;
    throw error;
  }

  try {
    //insert student into user table
    const resultUser = await db.query(
      `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 3)`,
      [
        student.username, student.password
      ]
    );
    // assign student to class
    const resultStudent = await db.query(
      `INSERT INTO student 
    (classname, username) 
    VALUES 
    (?, ?)`,
      [
        student.classname, student.username
      ]
    );
  }
  catch (err) {
    const error = new Error(err.sqlMessage);
    error.statusCode = 400;
    throw error;
  }

  let message = 'Created student';


  return { message };
}


module.exports = {
  createInstructor,
  createStudent
}