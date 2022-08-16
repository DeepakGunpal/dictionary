import { Router } from "express";
const route = Router();
import { addWord, getWord, word } from "../controller/word.js";

route.get('/getWord/:word', getWord);
route.get('/word/:word', word);

route.post('/addWord/:word', addWord)

export default route;