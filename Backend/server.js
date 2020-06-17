const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv/config");
const employeeRoutes = require("./routes/employees");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/employees", employeeRoutes);

mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("server listening at port 3000"));
