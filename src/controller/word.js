import wordModel from "../models/word.js";
import axios from 'axios';


const handleErr = (err) => {
    let errors = { title: '' }

    if (err.code === 11000) {
        errors.title = 'This word is already present'
        return errors;
    }

    if (err.message == "No such word exists") {
        errors.title = "No such word exists";
        return errors;
    }

    // validation errors
    if (err.message.includes('word validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const addWord = async (req, res) => {
    try {
        let { word } = req.params;
        let options = {
            method: "get",
            url: `https://od-api.oxforddictionaries.com/api/v2/entries/en/${word}`,
            headers: {
                app_id: "742c4977",
                app_key: "414ea5afdf655b8892661eeffe6764d6"
            }
        }
        const wordMeaning = await axios(options).catch(err => { throw new Error("No such word exists") });

        if (wordMeaning) {

            const title = word;
            const lexicalCategory = wordMeaning.data.results[0].lexicalEntries[0].lexicalCategory.text;
            const origin = wordMeaning.data.results[0].lexicalEntries[0].entries[0].etymologies[0];

            const definitions = [];
            const example = [];
            const synonyms = [];

            wordMeaning.data.results[0].lexicalEntries.map(ent => {
                ent.entries.map(sense => {
                    sense.senses.map(def => {
                        def.definitions.map(defi => {
                            if (defi) definitions.push(defi);
                        })
                        if (def.examples) {
                            def.examples.map(ex => { if (ex) example.push(ex.text) })
                        }
                        if (def.synonyms) {
                            def.synonyms.map(syn => { if (syn) synonyms.push(syn.text) })
                        }
                    })
                })
            })


            const newWord = { title, definitions, example, lexicalCategory, origin, synonyms };

            const wordSaved = [await wordModel.create(newWord)];

            res.status(200).send(wordSaved);
        }

    } catch (error) {
        const errorForUser = handleErr(error);
        console.log(error.message)
        return res.status(500).send(errorForUser)
    }
}

const word = async (req, res) => {
    try {
        let { word } = req.params;

        if (word) {
            word = { $regex: word, $options: 'i' }
        }

        const fetchWord = await wordModel.find({ title: word })
        res.status(200).send(fetchWord);
    } catch (error) {
        const errorForUser = handleErr(error);
        res.status(500).send(errorForUser)
    }
}


const allWord = async (req, res) => {
    try {
        const fetchWord = await wordModel.find().collation({ locale: "en", strength: 2 }).sort({ title: 1 })
        res.status(200).send(fetchWord);
    } catch (error) {
        const errorForUser = handleErr(error);
        res.status(500).send(errorForUser)
    }
}

export { addWord, word, allWord };