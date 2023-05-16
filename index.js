const express = require("express");
const port = 7000;

// exports form other files

const { connectDB } = require("./db");
const logger = require("./config/logger");

// all routes imports from other files
const survivorRoutes = require("./routers/survivor");
const inventoryRoutes = require("./routers/inventory");
// all routes imports from other files ends here

require("dotenv").config();
// db connection
connectDB();

// db connection end here

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// main body

const app = express();

// main body ends here

// middelwares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// middelwares end here

// App Routes Middelwares
app.use("/api", survivorRoutes);
app.use("/api", inventoryRoutes);
// App Routes Middelwares end here

// my routes

app.get("/", (req, res) => {
  res.send("welcom to dashboard");
});
// my routes end here

// app starts from

app.listen(process.env.PORT || port, (err) => {
  if (err) throw err;
  logger.info(`⚡ Ready on localhost:${port}⚡`);
});

// app ends here
