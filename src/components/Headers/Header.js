import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField } from "@mui/material";
import React from "react";
import AddWord from "../AddWord/AddWord";
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

    return (
        <div className="header">
            <span className="title" > {word ? word : "Dictionary"} </span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField
                        className="search"
                        label="Search a Word"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                    <AddWord />
                    
                </ThemeProvider>

            </div>

        </div>
    )
}

export default Header;