const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Generate token //
async function generateToken(user){
  const userRow = await db.query(
    `SELECT * 
    FROM user
    WHERE username=(?)`,
    [
        user.username
    ]
  );
  const checkPassword = await bcrypt.compare(user.password,userRow[0].password); 
  let token;
  if(checkPassword){
    token = jwt.sign(
        { username: user.username, type:userRow.type},
        process.env.TOKEN_KEY || "secret",
        {
          expiresIn: "2h",
        },
      );

    user.token = token;
  }
  else{
      //code error
  }


  return {
    token
  }
}





module.exports = {
    generateToken
}