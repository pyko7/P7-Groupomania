//creation of express app
const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(express.json());

/**
 * adding of header - everybody can access to API
 * adding of header - can use these headers
 * adding of header - can use these methods
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//routes
const userRoutes = require("./routes/user");

app.use("/api/auth", userRoutes);

module.exports = app;
