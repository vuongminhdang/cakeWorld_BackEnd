const express = require("express"); 
const cors = require("cors");
const app = express();
const router = require("./app/routes/route");
const contacts = require("./app/controllers/controller");

app.use(cors());
app.use(express.json());
app.use("/api/coffeeshop/",router);

app.get('/', (req, res)=>{
    res.send("Welcome to my coffee shop!");
})

module.exports = app;