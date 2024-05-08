/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Rating, Spinner } from "flowbite-react";
import { Dropdown } from "flowbite-react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // Funzione per caricare i generi dal server
  useEffect(() => {
    const fetchGenres = () => {
      fetch("http://localhost:8000/genres")
        .then((response) => response.json())
        .then((data) => setGenres(data))
        .catch((error) => console.error("Error fetching genres:", error));
    };

    fetchGenres();
  }, []); // Questo useEffect è eseguito solo una volta al montaggio del componente

  // Funzione per caricare i film in base a sort o genere
  useEffect(() => {
    const fetchMovies = () => {
      setLoading(true);
      const genreQuery = selectedGenre ? `&genre=${selectedGenre}` : "";

      fetch(`http://localhost:8000/movies?sort=${sortOrder}${genreQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setLoading(false);
        });
    };
    fetchMovies();
  }, [sortOrder, selectedGenre]); // Le dipendenze assicurano che la funzione venga eseguita ogni volta che cambiano

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <Layout>
      <Heading />
      <div className="flex justify-center mb-4 space-x-4">
        {" "}
        {/* Added space-x-4 to create space between children */}
        <Dropdown label="Ordina per:">
          <Dropdown.Item onClick={() => handleSortChange("newest")}>
            Più Recenti
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("rating_asc")}>
            Rating Crescente
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange("rating_desc")}>
            Rating Decrescente
          </Dropdown.Item>
        </Dropdown>
        <Dropdown label="Filtro per genere:">
          {genres.map((genre, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleGenreChange(genre.name)}
            >
              {genre.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>

      <MovieList loading={loading}>
        {movies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  );
};

const Layout = (props) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = (props) => {
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

const MovieList = (props) => {
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

const MovieItem = (props) => {
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
          {props.year || props.rating ? (
            <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
              <span>{props.year}</span>

              {props.rating ? (
                <Rating>
                  <Rating.Star />

                  <span className="ml-0.5">{props.rating}</span>
                </Rating>
              ) : null}
            </div>
          ) : null}

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipediaUrl ? (
          <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(props.wikipediaUrl, "_blank")}
          >
            More
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
