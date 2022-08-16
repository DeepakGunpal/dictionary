import React from 'react';
import './Definations.css'

const Definations = ({ word, meanings }) => {
    return (
        <div className='meanings'>
            {word === "" ? (
                <span className='subTitle'>Start by typing a word in Search</span>
            ) : (
                meanings.map(def => (
                    <div
                        className='singleMean'
                        style={{ backgroundColor: "white", color: "black" }}
                    >
                        <b style={{ backgroundColor: "white", color: "blue" }}>word : </b>
                        {
                            < span > {def.title} < hr /></span>

                        }
                        <b >lexicalCategory : </b>
                        {
                            < span > {def.lexicalCategory} < hr /></span>

                        }
                        <b >origin : </b>
                        {
                            < span > {def.origin} < hr /></span>

                        }
                        <b>Definitions :</b> <hr />
                        {
                            def.definitions.map(defi => (
                                <b> {defi} <hr /> </b>
                            ))
                        }
                        <b>Example :</b> <hr />
                        {
                            def.example.map(ex => (
                                <span>{ex} <hr /></span>
                            ))
                        }
                        <b>Synonyms : </b>
                        {
                            def.synonyms.map(syn => (
                                <span>{syn}, </span>
                            ))
                        }
                        <br />
                        <hr />
                        <br />

                    </div >

                ))
            )
            }
        </div >
    );
}

export default Definations;