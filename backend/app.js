//creation of express app
const express = require("express");

const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

/**
 * avoid 'ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200' error for profile picture
 * adding of header - everybody can access to API
 * adding of header - can use these headers
 * adding of header - can use these methods
 */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
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
const postRoutes = require("./routes/posts")

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRoutes);
app.use("/api", postRoutes);

module.exports = app;
