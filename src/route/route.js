import { Router } from "express";
const route = Router();
import { addWord, getWord, word } from "../controller/word.js";

route.get('/getWord/:word', getWord);
route.post('/getWord/:word', getWord);
route.post('/word/:word', word);
route.get('/word1/:word', async (req, res) => {
    res.json("i am working")
});
route.post('/word2/:word', async (req, res) => {
    res.json("i am post")
});

route.post('/addWord/:word', addWord)

export default route;