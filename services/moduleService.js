const db = require('./db');

// GET all users //
async function getModules(userData){
    const data = null;
    if(userData.type==1 || userData.type==2){
        const rows = await db.query(
            `SELECT name 
            FROM module`
          );
        data = rows;
    }
    else{
        const rows = await db.query(
            `SELECT module.name 
            FROM module, class_module, student
            WHERE module.id=class_module.moduleid AND class_module.classid=student.classid AND student.userid=(?)`,
            [
                userData.userid
            ]
          );
        data = rows;

    }
  
  

  return {
    data
  }
}


// CREATE instructor //
async function createInstructor(instructor){
  const result = await db.query(
    `INSERT INTO user 
    (username, password) 
    VALUES 
    (?, ?)`, 
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


module.exports = {
  getModules,
  createInstructor
}