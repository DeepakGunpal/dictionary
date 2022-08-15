import express from 'express';
import mongoose from 'mongoose';
import route from './route/route.js';
import path from "path";
import pkg from 'dotenv';
pkg.config({ path: './src/config.env' });

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
});

if (process.env.NODE_ENV == "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const DB = process.env.DB;
console.log(DB)
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(
    _ => app.listen(PORT, (_ => console.log(`server is live on ${PORT}`)))
)

app.use('/', route)