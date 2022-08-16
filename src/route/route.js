import { Router } from "express";
const route = Router();
import { addWord, allWord, word } from "../controller/word.js";

route.post('/word/:word', word);

route.post('/addWord/:word', addWord)

route.post('/allWord', allWord)

export default route;