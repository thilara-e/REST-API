const db = require('./db');
const user = require('./user.service');
const randomPasswordGenerator = require('secure-random-password');


// CREATE class //
async function createClass(classData){
  const schema = Joi.object({
    classname: Joi.string()
        .required(),
    modules: Joi.array().items(Joi.number())
        .required(),
    students:  Joi.array().items(Joi.string())
        .required(),

  });
  const valid=await schema.validate(classData);
  if(valid.error){
    throw new Error('Validation Error');
  }
  const password=randomPasswordGenerator.randomPassword();
  // create class in class table
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
  const students= classData.students;
  for (let i = 0; i < students.length; i++) {
      const studentData={"classname":classData.classname, "username":students[i], "password":password};
      await user.createStudent(studentData);
  }

  // create students and assign into class
  const modules= classData.modules;
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



  let message = 'Error in creating class';

  if (!(resultClass.affectedRows && resultModule.affectedRows)) {
    throw new Error('No Data Found');
  }

  return {message,password};
}


module.exports = {
    createClass
}