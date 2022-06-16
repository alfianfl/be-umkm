const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const config = require("./config");
const apiRoutes = require("./routes/index");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "https://delicate-cranachan-9fa6da.netlify.app/",  optionSuccessStatus: 200 }));


app.use("/api", apiRoutes);

dotenv.config();

//Database Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => res.send("You are connected to API UMKM Cimahi"));

app.listen(PORT, () => console.log(`Server is Running on port ` + PORT));
