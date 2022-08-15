import './App.css';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Headers/Header';
import Definations from './components/definations/Definations';

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);

  const dictionaryAPI = async () => {
    try {

      const res = await fetch(`http://localhost:4000/getWord/en/${word}`, {
        method: "get"
      });

      const data = await res.json();

      // const data = await axios.get(
      //   `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
      // );

      setMeanings(data);

    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    dictionaryAPI();
  }, [word])

  return (
    <div
      className="App"
      style={{ height: "100vh", backgroundColor: '#282c34', color: "white" }}
    >

      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header
          word={word}
          setWord={setWord}
        />
        {meanings && (
          <Definations word={word} meanings={meanings} />
        )}
      </Container>
    </div>
  );
}

export default App;
