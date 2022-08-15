import { ThemeProvider } from "@emotion/react";
import { Button, createTheme,  TextField } from "@mui/material";
import React, { useState } from "react";
import Definations from "../definations/Definations";
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
        const res = await fetch(`http://localhost:4000/addWord/en/${word}`, {
            method: "POST"
        });

        const data = await res.json();
        setMeanings(data);
    }

    console.log(meanings)

    return (
        <div className="header">
            <span className="title" > {word ? word : "Word Hunt"} </span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        className="search"
                        label="Search a Word"
                        variant="standard"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={click}
                    >
                        Add Word
                    </Button>
                </ThemeProvider>
                <Definations meanings={meanings} />
            </div>

        </div>
    )
}

export default Header;