const env = process.env;

const config = {
  db: { 
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '1234',
    database: env.DB_NAME || 'mydb',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  TOKEN_KEY: env.TOKEN_KEY || 'secret'
};


module.exports = config;