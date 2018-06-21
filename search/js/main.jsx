import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search_results';

ReactDOM.render(
  <SearchBar url="/api" />,
  document.getElementById('searchResults'),
);
