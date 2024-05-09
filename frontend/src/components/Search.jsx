import React, { useState } from 'react';
import { Button, Label, Select } from 'flowbite-react';

export default function Search(props) {
  const [filterBy, setFilterBy] = useState('');
  const [order, setOrder] = useState('');
  const [genre, setGenre] = useState('');

  const genreOptions = props.genres.map( item =>
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  );

  const handleSearch = () => {
    return fetch(`http://localhost:8000/movies/search?filter_by=${filterBy}&&order=${order}&&genre=${genre}`)
    .then(response => response.json())
    .then(data => {
      props.setMovies(data)
    });
  }

  const handleClearSearch = () => {
    setFilterBy('');
    setOrder('');
    setGenre('');
    
    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        props.setMovies(data.movies);
    });
  }

  return(
    <div className="mb-8 mx-auto flex space-x-4 items-center max-w-screen-sm ">
      <div className="filter-by-wrapper flex-1">
        <Label value="Order by" />
        <Select id="filterBy" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="">Select ..</option>
          <option value="recent">Piu recenti</option>
          <option value="rating">Rating</option>
        </Select>
      </div>

      <div className="order-by-wrapper">
        <Label value="Direction" />
        <Select id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="">Select ..</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </Select>
      </div>

      <div className="genre-wrapper">
        <Label value="Genre" />
        <Select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select ..</option>
          {genreOptions}
        </Select>
      </div>
      
      <div className="action-buttons-wrapper space-y-2">
        <Button size="xs" onClick={handleSearch}>Apply Filter</Button>
        <Button size="xs" onClick={handleClearSearch}>Clear Filter</Button>
      </div>
    </div>
  );
};