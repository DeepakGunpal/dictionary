import { Router } from "express";
const route = Router();
import { addWord, allWord, word } from "../controller/word.js";

//fetch searched word
route.post('/word/:word', word);

//fetch all words
route.post('/allWord', allWord)
route.post('/addWord', addWord)

export default route;