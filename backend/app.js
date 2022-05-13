//creation of express app
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

/**
 * adding of header -avoid 'ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200' error for profile picture 
 * allow users to read the resources only when the browser recognizes their requests from the same site 
 * adding of header - can access to cookies
 * adding of header - everybody can access to API
 * adding of header - can use these headers
 * adding of header - can use these methods
 */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
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
const postRoutes = require("./routes/posts");

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRoutes);
app.use("/api", postRoutes);

module.exports = app;
