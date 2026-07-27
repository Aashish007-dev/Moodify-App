const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../src/routes/auth.routes');
const songRouter = require('../src/routes/song.routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);


module.exports = app;