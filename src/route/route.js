import { Router } from "express";
const route = Router();
import { addWord, allWord, word } from "../controller/word.js";

//fetch searched word
route.post('/word/:word', word);

//fetch from oxford api and store locally in our mongoDB
route.post('/addWord/:word', addWord)

//fetch all words
route.post('/allWord', allWord)

export default route;