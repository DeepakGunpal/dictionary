import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Header.css"


const Header = ({ word, setWord }) => {

    const [meanings, setMeanings] = useState([]);
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            mode: 'dark',
        },
    });



    const click = async () => {
        const res = await fetch(`https://deepak-dictionary.herokuapp.com/addWord/${word}`, {
            method: "POST"
        });

        const data = await res.json();
        setMeanings(data);
        setWord("");
    }

    return (
        <div className="header">
        <span>Deepak Gunpal</span>
            <span className="title" > {word ? word : "Word Hunt"} </span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        className="search"
                        label="Search a Word"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        className="add"
                        onClick={click}
                    >
                        Add Word
                    </Button>
                </ThemeProvider>

            </div>

        </div>
    )
}

export default Header;