// SearchBox.js
import React, { useState } from 'react';

const SearchBox = ({ fetchData }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    fetchData(query);
  };

  return (
    <div className="search-box">
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="box1"
          required
        />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBox;
