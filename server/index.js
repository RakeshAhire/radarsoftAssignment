const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const { connection } = require('./database/db');
const { UserRouter } = require('./routes/user.route');
const { AuthRouter } = require('./routes/auth.route');
const { BlogRouter } = require('./routes/blog.route');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
    credentials: true ,
    origin: 'http://localhost:3000'}));

app.get("/", (req, res) => {
    try {
        res.send("Blog Server is Working...!")
    } catch (error) {
        console.log('error: ', error);
    }
})

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/blog", BlogRouter);

//error hadnling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(8080, async () => {
    await connection
    console.log("App listen port 8080");
})