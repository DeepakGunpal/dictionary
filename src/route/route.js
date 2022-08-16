import { Router } from "express";
const route = Router();
import { addWord, word } from "../controller/word.js";

route.post('/word/:word', word);

route.post('/addWord/:word', addWord)

export default route;