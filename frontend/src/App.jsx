import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // creo una funzione che mi riporti il valore dell'input in modo tale da poter filtrare l'array dei film
  const [query, setQuery]= useState("");

  const handleChangeText = (e) => {
    const value = e.target.value;
    setQuery(value);
  } 
  
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
  //  //creo una funzione che mi riporti il valore dell'input in modo tale da poter filtrare l'array dei film //

  const fetchMovies = () => {
    setLoading(true);

    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />

      {/* porto handleChangeText dentro il componente movieList (onSearch) */}
      <MovieList onSearch={handleChangeText} loading={loading}>
        {filteredMovies.map((item, key) => (
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
    <>
      {/* aggiungo un form per la ricerca dei film tramite nome */}
      <form action="" className='mt-2 mb-2'>
          <input type="text" className='text-gray-700 text-sm font-bold mb-2 me-2' onChange={props.onSearch}/>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Search</button>
      </form>
      {/* //aggiungo un form per la ricerca dei film tramite nome// */}

      <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
        {props.children}
      </div>
    </>
  );
};

const MovieItem = props => {
  return (
    <>
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
    </>
  );
};

export default App;
