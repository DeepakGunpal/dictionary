import { Router } from "express";
const route = Router();
import { addWord, getWord } from "../controller/word.js";

route.get('/getWord/:language/:word', getWord);

route.post('/addWord/:language/:word', addWord)

export default route;