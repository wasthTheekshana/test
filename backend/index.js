const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

var cors = require('cors');
const app = express()
app.use(cors({origin: '*'}));

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
.connect(process.env.MONGO_URL,{
   useNewUrlParser: true,
   useUnifiedTopology: true
 })
 .then(console.log("Connected to MongoDB"))
 .catch((err) => console.log(err));

 app.use(express.json())
 const directory = path.join(__dirname, './images');
 app.use("/images", express.static(directory));


 app.use("/api/posts", postRouter)
 app.use("/api/user", userRoutes);
 app.use("/api/profile", profileRoutes);

app.listen("5000", () =>{
    console.log("backend is running");
});