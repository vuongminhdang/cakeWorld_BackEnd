const express = require("express"); 
const cors = require("cors");
const app = express();
const router = require("./app/routes/route");
const ApiError = require("./api-error");

app.use(cors());
app.use(express.json());
app.use("/api/coffeeshop/",router);
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
    });
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    });
    });
    

app.get('/', (req, res)=>{
    res.send("Welcome to my coffee shop!");
})


module.exports = app;