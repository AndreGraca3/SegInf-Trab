const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require("./routes");
const path = require("path");
const { PORT } = require("./config");

// Setup middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

// Set view engine and views directory for rendering HTML
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Load routes
app.get("/", (req, rsp) => {
  rsp.render("home");
});
app.use(routes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
