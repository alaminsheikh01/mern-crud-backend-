const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

// import router
const studentRouter = require("./routes/postRoutes");

const app = express();

// database connected
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// route middleware
app.use("/api", studentRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
