const db = require('./db');

// CREATE class //
async function createClass(classData){
  const result = await db.query(
    `INSERT INTO class 
    (classname) 
    VALUES 
    (?)`, 
    [
        classData.name
    ]
  );

  let message = 'Error in creating instructor';

  if (result.affectedRows) {
    message = 'Instructor created successfully';
  }

  return {message};
}


module.exports = {
    createClass
}