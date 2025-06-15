require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("H@ckollab Backend Running");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port", process.env.PORT || 4000);
});
