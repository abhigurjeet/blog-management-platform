require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const allRoutesRouter = require("./Routes/allRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Database connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_URL);
}

app.use(bodyParser.json());
app.use(cors());
app.use("/", allRoutesRouter);

app.listen(process.env.PORT, () => {
  console.log("server is up and running");
});
