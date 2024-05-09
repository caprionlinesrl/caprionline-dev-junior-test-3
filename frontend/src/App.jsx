import React, { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import Heading from './components/Heading.jsx';
import Search from './components/Search.jsx';
import MovieList from './components/MovieList.jsx';
import MovieItem from './components/MovieItem.jsx';

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([])

  const fetchMovies = () => {
    setLoading(true);

    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies);
        setGenres(data.genres)
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <Search setMovies={setMovies} genres={genres}/>
      <MovieList loading={loading}>
        {movies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  );
};

export default App;
