import React, { useEffect, useState } from "react";
import { glosar } from "./data";

function removeDiacritics(word) {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parse_info(data) {
  if (typeof(data) === 'string') {
    return <ul><li>{data}</li></ul>;
  } else if (Array.isArray(data)) {
    const list = data.map((v, i) => (
      (<li key={i}>{v}</li>)
     )) 
    return <ul>{list}</ul>;
  }
  return null;
}

function App() {
  const [query, setQuery] = useState('');
  const [filteredKeys, setFilteredKeys] = useState([]);

  useEffect(() => {
    const normalizedQuery = removeDiacritics(query);

    const filtered = Object.keys(glosar).filter(key =>
      removeDiacritics(key).includes(normalizedQuery)
    );
    setFilteredKeys(filtered);
  }, [query]);


  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={query}
          placeholder="Cauta..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <ul>
        {filteredKeys.map((key, i) => (
          <li key={i}>
            <p>{key}</p>
            {parse_info(glosar[key])}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
