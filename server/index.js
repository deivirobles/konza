const express = require("express");
const requestId = require("express-request-id")();

const logger = require("./config/logger");
const api = require("./api/v1");

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
//setup middleware
app.use(requestId);
app.use(logger.requests);
app.use("/api/v1", api);
app.use("/api", api);

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
