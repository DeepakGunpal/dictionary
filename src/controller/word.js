import wordModel from "../models/word.js";
import axios from 'axios';

//handle errors
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
        if (err.errors.properties) {
            Object.values(err.errors).forEach(({ properties }) => {
                errors[properties.path] = properties.message;
            });
        }
    }

    return errors;
}


//fetch the searched word from mongoDB
const word = async (req, res) => {
    try {
        let { word } = req.params;

        //used $regex to match substring also
        // and $options for case sensitive
        if (word) {
            word = { $regex: word, $options: 'i' }
        }

        const fetchWord = await wordModel.find({ title: word }).collation({ locale: "en", strength: 2 }).sort({ title: 1 })

        if (fetchWord.length === 0) {
            let options = {
                method: "get",
                url: `https://od-api.oxforddictionaries.com/api/v2/entries/en/${req.params.word}`,
                headers: {
                    app_id: "ee97a96d",
                    app_key: "238dedef737a396a8d8bcedcd93e6d4c"
                }
            }
            const wordMeaning = await axios(options).catch(err => { throw new Error("No such word exists") });

            if (wordMeaning) {

                const title = req.params.word;
                const lexicalCategory = wordMeaning.data.results[0].lexicalEntries[0].lexicalCategory.text;
                const origin = wordMeaning.data.results[0].lexicalEntries[0].entries[0].etymologies[0];
                let audio;
                if (wordMeaning.data.results[0].lexicalEntries[0].entries[0].pronunciations[0])
                    audio = wordMeaning.data.results[0].lexicalEntries[0].entries[0].pronunciations[0]

                const definitions = [];
                const example = [];
                const synonyms = [];

                //storing only the relevant part from api 
                wordMeaning.data.results[0].lexicalEntries.map(ent => {
                    ent.entries.map(sense => {
                        sense.senses.map(def => {
                            if (def.definitions) {
                                def.definitions.map(defi => {
                                    if (defi) definitions.push(defi);
                                })
                            }
                            if (def.examples) {
                                def.examples.map(ex => { if (ex) example.push(ex.text) })
                            }
                            if (def.synonyms) {
                                def.synonyms.map(syn => { if (syn) synonyms.push(syn.text) })
                            }
                        })
                    })
                })


                const newWord = { title, definitions, audio, example, lexicalCategory, origin, synonyms };

                //create doc and store in word collection
                const wordSaved = [await wordModel.create(newWord)];

                return res.status(200).send(wordSaved);
            }
        }

        res.status(200).send(fetchWord);
    } catch (error) {
        const errorForUser = handleErr(error);
        res.status(500).send(errorForUser)
    }
}

//fetch all words form DB
const allWord = async (req, res) => {
    try {
        //used collation to specify the language and strength to sort in english alpha. order
        const fetchWord = await wordModel.find().collation({ locale: "en", strength: 2 }).sort({ title: 1 })
        res.status(200).send(fetchWord);
    } catch (error) {
        const errorForUser = handleErr(error);
        res.status(500).send(errorForUser);
    }
}

const addWord = async (req, res) => {
    try {
        const { title, lexicalCategory, origin, definition, example, synonym } = req.body;

        if (definition === undefined) throw new Error('definition is required');

        const newWordData = { title, definitions: [definition], audio: {}, example: [example], lexicalCategory, origin, synonyms: [synonym] };
        const newWord = [await wordModel.create(newWordData)];
        res.status(200).send(newWord);

    } catch (error) {
        const errorForUser = handleErr(error);
        console.log(error)
        res.status(500).send(errorForUser);
    }

}

export { word, allWord, addWord };