require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.route');
const classRouter = require('./routes/class.route');
const moduleRouter = require('./routes/module.route');
const authRouter = require('./routes/auth.route');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDocs = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition:{
    info: {
      title: "REST API", 
      description: "Role based REST API development", 
      version: "1.0.0", 
      servers: ["http://localhost:3000"]
    }
    
  },
  apis: ["./routes/*.js"],

};

const swaggerDocs = swaggerJSDocs(swaggerOptions);
//Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/health', (req, res) => {
  res.json({'message': 'ok'});
})


app.use('/user', userRouter);
app.use('/class', classRouter);
app.use('/module', moduleRouter);
app.use('/auth', authRouter);



/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});