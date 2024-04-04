var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { loggerWinston, requestLogger } = require('./utils/logger');

//Swagger
const swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Backend tech assessment",
      version: "0.1.0",
      description:
        "Documentation for backend tech assessment Santiago Salazar",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

var indexRouter = require('./routes/index');

var app = express();

//Request handler middleware
app.use(requestLogger);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

//error handler middleware
app.use((err, req, res, next) => {
  loggerWinston.error(err.stack);
  res.status(500).send('Something broke!');
});

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
