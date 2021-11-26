const db = require('./db');

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
  const result = await db.query(
    `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 2)`, 
    [
      instructor.name, instructor.password
    ]
  );

  let message = 'Error in creating instructor';

  if (result.affectedRows) {
    message = 'Instructor created successfully';
  }

  return {message};
}

// CREATE instructor //
async function createStudent(student){
  const result = await db.query(
    `INSERT INTO user 
    (username, password, type) 
    VALUES 
    (?, ?, 3)`, 
    [
      student.name, student.password
    ]
  );

  let message = 'Error in creating student';

  if (result.affectedRows) {
    message = 'Student created successfully';
  }

  return {message};
}


module.exports = {
  getUsers,
  createInstructor,
  createStudent
}