const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const { PORT } = require("./config");
const appController = require("./controllers/appController");
const authController = require("./controllers/authController");
const roleController = require("./controllers/roleController");
const tasksController = require("./controllers/tasksController");

// Setup middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

// Set view engine and views directory for rendering HTML
const viewsPath = path.join(__dirname, "views");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(path.join(viewsPath, "partials"));

// Load routes
app.use(appController);
app.use(authController);
app.use(roleController);
app.use(tasksController);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
