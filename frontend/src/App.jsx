import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner, Navbar, Dropdown } from 'flowbite-react';
const genres = ["Azione","Avventura","Animazione","Commedia","Crimine","Dramma","Famiglia","Fantasia", "Storia","Orrore","Musica", "Mistero", "Romantico", "Fantascienza", "Sport", "Romazo Giallo", "Guerra"];
let i=1;
let genresList = genres.map(function(genre){
  let url ="/movies?data="+i;
  i++;
  return (
      <Dropdown.Item>
        <Navbar.Link href={url}>
          {genre}
        </Navbar.Link>
      </Dropdown.Item>
  )
})

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = () => {
    setLoading(true);


    return fetch('http://localhost:8000/movies'+window.location.search)
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <Filters/>
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
const Filters = props =>{
  if (props.loading) {
    return
  }
  return (
        <Navbar fluid rounded>      
          <div className="flex md:order-2">
        <Navbar.Toggle />
          </div>
        <Navbar.Collapse>
        <Dropdown label="Ordina per" dismissOnClick={false}>
          <Dropdown.Item>
            <Navbar.Link href="/movies?data=recent" active>
              Più recenti
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/movies?data=highest" active>
              Rating più alto
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Navbar.Link href="/movies?data=lowest" active>
              Rating più basso
            </Navbar.Link>
          </Dropdown.Item>
        </Dropdown>
        <Dropdown label="Filtri" dismissOnClick={false}>
            {genresList}
        </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    );
}

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
        {props.children}
      </div>
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

export default App;
