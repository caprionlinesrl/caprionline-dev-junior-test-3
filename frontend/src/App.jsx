import React, { useEffect, useState } from 'react';
import { Button, Label, Rating, Select, Spinner } from 'flowbite-react';

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

const Layout = props => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>

      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of movies
      </p>
    </div>
  );
};

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.imageUrl}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
                <span>{props.year}</span>

                {props.rating
                  ? <Rating>
                      <Rating.Star />

                      <span className="ml-0.5">
                        {props.rating}
                      </span>
                    </Rating>
                  : null
                }
              </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl
          ? <Button
              color="light"
              size="xs"
              className="w-full"
              onClick={() => window.open(props.wikipediaUrl, '_blank')}
            >
              More
            </Button>
          : null
        }
      </div>
    </div>
  );
};

const Search = props => {
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

      <Button size="xs" onClick={handleSearch}>Apply Filter</Button>
    </div>
  );
};

export default App;
