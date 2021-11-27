const db = require('./db');

// GET all modules based on user type //
async function getModules(jwtToken) {
  const type = jwtToken.type;
  const username = jwtToken.username;
  let data = null;
  try {
    if (type == 1 || type == 2) {
      const rows = await db.query(
        `SELECT distinct modulename 
            FROM class_module`
      );
      data = rows;
    }
    else {
      const rows = await db.query(
        `SELECT distinct modulename 
            FROM class_module, student
            WHERE class_module.classname=student.classname AND student.username=(?)`,
        [
          username
        ]
      );
      data = rows;

    }
  }
  catch (err) {
    const error = new Error(err.sqlMessage);
    error.statusCode = 400;
    throw error;
  }



  return {
    data
  }
}

// execute modules based on user type and module accessibility//
async function executeModules(jwtToken, modulename) {
  const type = jwtToken.type;
  const username = jwtToken.username;
  let message = null;
  if (type == 1 || type == 2) {
    message = "Hello Module" + modulename;
    return (message);
  }
  else {
    let rows;
    try {
      rows = await db.query(
        `SELECT distinct modulename 
      FROM class_module, student
      WHERE class_module.classname=student.classname AND student.username=(?)`,
        [
          username
        ]
      );
    }
    catch (err) {
      const error = new Error(err.sqlMessage);
      error.statusCode = 400;
      throw error;
    }
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].modulename == modulename) {
        message = "Hello Module " + modulename;
        return (message);
      }
    }
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;




  }
}


module.exports = {
  getModules,
  executeModules
}