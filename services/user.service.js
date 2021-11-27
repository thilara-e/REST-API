const db = require('./db');
const randomPasswordGenerator = require('secure-random-password');
const Joi = require('joi');
const bcrypt = require('bcryptjs');



// CREATE instructor //
async function createInstructor(instructor){

  const schema = Joi.object({
    username: Joi.string()
        .required(),

  });
  const valid=await schema.validate(instructor);
  if(valid.error){
    return res.status(400).send("Bad Request");

  }
  
  const password=randomPasswordGenerator.randomPassword();
  const bcryptPassword=await bcrypt.hash(password, 8);

  try{let result = await db.query(
    `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 2)`, 
    [
      instructor.username, bcryptPassword
    ]
  );
  }
  catch(err){
    return res.status(400).send(err.sqlMessage);
  }

  if (!result.affectedRows) {
    throw new Error('No Data Found');
  }

  return {password};
}

// CREATE student //
async function createStudent(student){

  const schema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
    classname: Joi.string()
        .required(),

  });
  const valid=await schema.validate(instructor);
  if(valid.error){
    return res.status(400).send("Bad Request");
  }

  const resultUser = await db.query(
    `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 3)`, 
    [
      student.username, student.password
    ]
  );

  const resultStudent = await db.query(
    `INSERT INTO student 
    (classname, username) 
    VALUES 
    (?, ?)`, 
    [
      student.classname, student.username
    ]
  );

  let message = 'Error in creating student';

  if (!(resultUser.affectedRows && resultStudent.affectedRows)) {
    return res.status(404).send("Not Found");
  }

  return {message};
}


module.exports = {
  createInstructor,
  createStudent
}