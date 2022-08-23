import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "word is required"],
        unique: true
    },
    lexicalCategory: {
        type: String
    },
    origin: String,
    audio: Object,
    definitions: {
        type: Array,
        required: true
    },
    example: Array,
    synonyms: Array
});

export default mongoose.model('word', wordSchema);