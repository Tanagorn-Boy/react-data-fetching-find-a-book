import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [findBook, setFindBook] = useState("");
  const [show, setShow] = useState([]);

  const fetchData = async () => {
    if (!findBook.trim()) return;
    try {
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${findBook}`
      );
      setShow(result.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [findBook]);

  return (
    <div className="App">
      <h1>Find Book</h1>
      <input
        type="text"
        value={findBook}
        onChange={(event) => setFindBook(event.target.value)}
      />
      <div>
        {show.map((book, index) => (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
