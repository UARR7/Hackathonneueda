const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Heyy");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Processing");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
