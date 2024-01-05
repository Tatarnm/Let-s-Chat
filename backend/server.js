const express = require("express");
const dotenv = require("dotenv");
let { chats } = require("./data/dummy_data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes")
const {notFound , errorHandler} = require("./middlewares/errorMiddleware.js")

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); //for accepting json data

app.use("/api/user",userRoutes);

app.use(notFound)
app.use(errorHandler)

//console.log(chats);
/*app.get("/", (req,res)=> {
    res.send("Api is running");
});
app.get("/api/chat",(req,res)=>{
    res.send(chats);
});*/
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// video 24:26