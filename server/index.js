const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });

// Routes
const authRoutes = require("./routes/auth");
const contestRoutes = require("./routes/contest");

app.use("/api", authRoutes);
app.use("/api", contestRoutes);

app.get("/", (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
