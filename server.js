require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const obligationRoutes = require("./routes/obligations");
const userRoutes = require("./routes/user");

// express app
const app = express();

// add cors middleware
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middleware
app.use(express.json()); // looks for a request body (so we can use req.body in our routes)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/obligations", obligationRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch(err => console.log(err));
