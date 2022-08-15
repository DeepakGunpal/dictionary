import express from 'express';
import mongoose from 'mongoose';
import route from './route/route.js';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" });
    next();
});

if (process.env.NODE_ENV == "production") {

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

mongoose.connect("mongodb+srv://DeepakGunpal:hdg5NWwcvf2wUDTN@deepakcluster0.hynna.mongodb.net/dictionaryRoaDo", {
    useNewUrlParser: true
}).then(
    _ => app.listen(PORT, (_ => console.log(`server is live on ${PORT}`)))
)

app.use('/', route)