import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const asynceFunction = async (query) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setData(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      asynceFunction(e.target.value); 
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  return (
    <>
      <div className="App">
        <h1>Find a Book</h1>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        {data ? (
        <ul>
          {data.docs.map((doc) => (
            <li key={doc.key}>{doc.title}</li>
          ))}
        </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}

export default App;
