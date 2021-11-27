const db = require('./db');
const user = require('./user.service');
const randomPasswordGenerator = require('secure-random-password');
const Joi = require('joi');
const bcrypt = require('bcryptjs');




// CREATE class //
async function createClass(classData) {
  const schema = Joi.object({
    classname: Joi.string()
      .required(),
    modules: Joi.array().items(Joi.string())
      .required(),
    students: Joi.array().items(Joi.string())
      .required(),

  });
  const valid = await schema.validate(classData);
  if (valid.error) {
    const error = new Error(valid.error.message);
    error.statusCode = 400;
    throw error;
  }
  const password = randomPasswordGenerator.randomPassword();
  const bcryptPassword = await bcrypt.hash(password, 8);

  // create class in class table
  try {
    const resultClass = await db.query(
      `INSERT INTO class 
    (classname) 
    VALUES 
    (?)`,
      [
        classData.classname
      ]
    );

    // create students and assign into class
    const students = classData.students;
    for (let i = 0; i < students.length; i++) {
      const studentData = { "classname": classData.classname, "username": students[i], "password": bcryptPassword };
      await user.createStudent(studentData);
    }

    // create students and assign into class
    const modules = classData.modules;
    let resultModule;
    for (let i = 0; i < modules.length; i++) {
      resultModule = await db.query(
        `INSERT INTO class_module 
        VALUES 
        (?,?)`,
        [
          classData.classname, modules[i]
        ]
      );
    }
  }
  catch (err) {
    const error = new Error(err.sqlMessage);
    error.statusCode = 400;
    throw error;
  }



  

  return {password};
}


module.exports = {
  createClass
}