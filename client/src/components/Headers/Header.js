import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, TextField } from "@mui/material";
import React from "react";
import "./Header.css"


const Header = ({ word, setWord }) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            mode: 'dark',
        },
    });


    //fetch new words from oxford api and storing in mongoDB
    const click = async () => {
        await fetch(`https://deepak-dictionary.herokuapp.com/addWord/${word}`, {
            method: "POST"
        });

        setWord("");
    }

    return (
        <div className="header">
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