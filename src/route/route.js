import { Router } from "express";
const route = Router();
import { addWord, getWord } from "../controller/word.js";

route.get('/getWord/:word', getWord);

route.post('/addWord/:word', addWord)

export default route;