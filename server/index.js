const express = require("express");
const requestId = require("express-request-id")();
const bodyParser = require("body-parser");

const logger = require("./config/logger");
const api = require("./api/v1");

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
//setup middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Request Id
app.use(requestId);

//Log request
app.use(logger.requests);

app.use("/api", api);
app.use("/api/v1", api);

//Not route found middleware

app.use((req, res, next) => {
  res.status(404);
  const message = "Route not found";
  const statusCode = 404;

  next({
    message,
    statusCode,
    level: "info",
  });
});

// Error middleware

app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = "error" } = err;
  const logMessage = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](logMessage);
  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
