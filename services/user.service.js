const db = require('./db');
const randomPasswordGenerator = require('secure-random-password');


// GET all users //
async function getUsers(){
  const rows = await db.query(
    `SELECT * 
    FROM user`
  );
  const data = rows;

  return {
    data
  }
}


// CREATE instructor //
async function createInstructor(instructor){
  const password=randomPasswordGenerator.randomPassword();
  const result = await db.query(
    `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 2)`, 
    [
      instructor.name, password
    ]
  );

  let message = 'Error in creating instructor';

  if (result.affectedRows) {
    message = 'Instructor created successfully';
  }

  return {message,password};
}

// CREATE student //
async function createStudent(student){
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

  if (resultUser.affectedRows && resultStudent.affectedRows) {
    message = 'Student created successfully';
  }

  return {message};
}


module.exports = {
  getUsers,
  createInstructor,
  createStudent
}