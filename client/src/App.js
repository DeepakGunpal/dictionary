import './App.css';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Header from './components/Headers/Header';
import Results from './components/results/Results';

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);

  const dictionaryAPI = async () => {
    try {

      const res = await fetch(`https://deepak-dictionary.herokuapp.com/word/${word}`, {
        method: "POST"
      });

      const data = await res.json();

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
        style={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: 'space-evenly' }}
      >
        <Header
          word={word}
          setWord={setWord}
        />
        {meanings && (
          <Results word={word} meanings={meanings} />
        )}
      </Container>
    </div>
  );
}

export default App;
