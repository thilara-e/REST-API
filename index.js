const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user.route');
const classRouter = require('./routes/class.route');
const moduleRouter = require('./routes/module.route');
const authRouter = require('./routes/auth.route');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/basicInfo');


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


//Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

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