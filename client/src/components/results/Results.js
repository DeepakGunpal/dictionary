import React, { useEffect, useState } from 'react';
import Definitions from '../definitions/Definitions';
import './Results.css'

const Results = ({ word, meanings }) => {
    const [allWords, setallWords] = useState([]);

    //fetching all words form mongoDB
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
        //return definitions
        <div className='meanings'>

            {word === "" ? (
                //when search is empty show all words from DB in sorted in alphabetical order
                <Definitions meanings={allWords} />
            ) : (
                //when searched word is not availble on mongoDB
                meanings.length === 0 ? (<span className='subTitle'>Not available, Press Add word and Search again</span>) :
                    (
                        //when there is word in search then show data matched as complete sting or even as substring
                        //in alphebetical order
                        <Definitions meanings={meanings} />
                    )
            )
            }
        </div >
    );
}

export default Results;