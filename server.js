
const app = require("./app"); 
const port = 3000; 
//Khởi động server
app.listen(port, ()=>{
    console.log("Server is running on port " + port);
})