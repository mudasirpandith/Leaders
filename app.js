const express = require("express");
const app = express();
const cors = require("cors");

var cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(require("./routes/routes"));

require("./db/conn");
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
