const db = require('./db');
const user = require('./userService');
const randomPasswordGenerator = require('secure-random-password');


// CREATE class //
async function createClass(classData){
  const password=randomPasswordGenerator.randomPassword();
  // create class in class table
  const resultClass = await db.query(
    `INSERT INTO class 
    (classname) 
    VALUES 
    (?)`, 
    [
        classData.name
    ]
  );

  // create students and assign into class
  const students= classData.students;
  for (let i = 0; i < students.length; i++) {
      const studentData={"classname":classData.name, "username":students[i], "password":password};
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
            classData.name, modules[i]
        ]
      );
  } 



  let message = 'Error in creating class';

  if (resultClass.affectedRows && resultModule.affectedRows) {
    message = 'Class created successfully';
  }

  return {message,password};
}


module.exports = {
    createClass
}