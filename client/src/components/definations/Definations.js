import React, { useEffect, useState } from 'react';
import './Definations.css'

const Definations = ({ word, meanings }) => {
    const [allWords, setallWords] = useState([]);
    const dictionaryAPI = async () => {
        try {

            const res = await fetch(`https://deepak-dictionary.herokuapp.com/allWord`, {
                method: "POST"
            });

            const data = await res.json();

            setallWords(data);

        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        dictionaryAPI();
    }, [])
    
    return (
        <div className='meanings'>

            {word === "" ? (
                allWords.map(def => (
                    <div
                        className='singleMean'
                        style={{ backgroundColor: "white", color: "black" }}
                    >
                        <b style={{ backgroundColor: "white", color: "blue", fontSize: '30px', textTransform: 'uppercase' }}>WORD : {def.title} </b>
                        < hr />

                        {def.audio && (
                            <div className='audio'>
                                <b >Pronunciation : </b>
                                <audio
                                    src={def.audio.audioFile}
                                    controls
                                    style={{ backgroundColor: '#fff', borderRadius: 10 }}

                                >
                                    Your browser does not support audio element
                                </audio></div>
                        )}
                        {def.audio && (<hr />)}

                        {
                            < span > <b >lexicalCategory : </b> {def.lexicalCategory} < hr /></span>

                        }

                        {
                            < span > <b >origin : </b>{def.origin} < hr /></span>

                        }
                        <b>Definitions :</b> <hr />
                        {
                            def.definitions.map(defi => (
                                <b> {defi} <hr /> </b>
                            ))
                        }
                        {def.example.length !== 0 && (<b>Example : <hr /></b>)}
                        {def.example.length !== 0 && (
                            def.example.map(ex => (
                                <span>{ex} <hr /></span>
                            ))
                        )}
                        {def.synonyms.length !== 0 && (<span> <b>Synonyms : </b> {def.synonyms.map(syn => `${syn}, `)}, </span>)}

                    </div >

                ))
            ) : (
                meanings.length === 0 ? (<span className='subTitle'>Not available, Press Add word and Search again</span>) :
                    (
                        meanings.map(def => (
                            <div
                                className='singleMean'
                                style={{ backgroundColor: "white", color: "black" }}
                            >
                                <b style={{ backgroundColor: "white", color: "blue", fontSize: '30px', textTransform: 'uppercase' }}>WORD : {def.title} </b>
                                < hr />
                                {def.audio && (
                                    <div className='audio'>
                                        <b >Pronunciation : </b>
                                        <audio
                                            src={def.audio.audioFile}
                                            controls
                                            style={{ backgroundColor: '#fff', borderRadius: 10 }}

                                        >
                                            Your browser does not support audio element
                                        </audio></div>
                                )}
                                {def.audio && (<hr />)}
                                {
                                    < span > <b >lexicalCategory : </b> {def.lexicalCategory} < hr /></span>

                                }

                                {
                                    < span > <b >origin : </b>{def.origin} < hr /></span>

                                }
                                <b>Definitions :</b> <hr />
                                {
                                    def.definitions.map(defi => (
                                        <b> {defi} <hr /> </b>
                                    ))
                                }
                                {def.example.length !== 0 && (<b>Example : <hr /></b>)}
                                {def.example.length !== 0 && (
                                    def.example.map(ex => (
                                        <span>{ex} <hr /></span>
                                    ))
                                )}
                                {def.synonyms.length !== 0 && (<span> <b>Synonyms : </b> {def.synonyms.map(syn => `${syn}, `)}, </span>)}

                            </div >

                        ))
                    )
            )
            }
        </div >
    );
}

export default Definations;