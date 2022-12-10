import express from 'express';
import mongoose from 'mongoose';
import route from './route/route.js';
import cors from 'cors';
import pkg from 'dotenv';
pkg.config({ path: './src/config.env' });

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

//cors
app.use(cors({
    origin: "*"
}));

// console.log(DB)
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
}).then(
    _ => app.listen(PORT, (_ => console.log(`server is live on ${PORT}`)))
)

app.use('/', route)