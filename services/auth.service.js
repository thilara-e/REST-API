const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const config = require('../config');



// Generate token //
async function generateToken(user) {
    const schema = Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    });
    const valid = await schema.validate(user);
    if (valid.error) {
        return res.status(400).send("Bad Request");
    }

    const userRow = await db.query(
        `SELECT * 
    FROM user
    WHERE username=(?)`,
        [
            user.username
        ]
    );
    const checkPassword = await bcrypt.compare(user.password, userRow[0].password);
    let token;
    if (checkPassword) {
        token = jwt.sign(
            { username: user.username, type: userRow[0].type },
            config.TOKEN_KEY,
            {
                expiresIn: "2h",
            },
        );

        user.token = token;
    }
    else {
        const error = new Error("Invalid Login");
        error.statusCode = 401;
        throw error;
    }


    return {
        token
    }
}





module.exports = {
    generateToken
}