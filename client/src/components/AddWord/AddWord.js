import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AddWord.css'

export default function AddWord() {
    const [open, setOpen] = useState(false);
    const [wordRegistration, setWordRegistration] = useState({
        title: "",
        class: "",
        origin: "",
        definition: "",
        example: "",
        synonym: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    //fetch new words from oxford api and storing in mongoDB
    const Add = async (wordData) => {

        const data = await fetch(`https://deepak-dictionary.herokuapp.com/addWord`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(wordData)
        });


        if (data.status !== 200) window.alert("Word, class of word and definition is mandatory")
        else window.alert("Word Added successfully")

    }

    const handleAdd = () => {
        const newWordData = { ...wordRegistration }
        Add(newWordData);
        setWordRegistration("");
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setWordRegistration({ ...wordRegistration, [name]: value })
    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                className="add"
                style={{ fontWeight: 'bolder', fontSize: '15px', padding: '14px 15px', width: '100%' }}
            >
                Add Word
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Word</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        TO add a new word, Word and Definition is mandatory.
                    </DialogContentText>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Enter Word"
                            name="title"
                            required="true"
                        />
                        <TextField
                            className="search"
                            onChange={handleInput}
                            label="Class of word"
                            name="lexicalCategory"
                            required="true"
                        />
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={handleInput}
                        label="Origin"
                        name="origin"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete='off'

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={handleInput}
                        label="Definition"
                        name="definition"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        required="true"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={handleInput}
                        label="Example"
                        name="example"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={handleInput}
                        label="Synonym"
                        name="synonym"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
