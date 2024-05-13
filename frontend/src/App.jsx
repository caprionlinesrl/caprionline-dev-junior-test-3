import React, { useEffect, useState, useMemo } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';

const App = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // creo una funzione che mi riporti il valore dell'input in modo tale da poter filtrare l'array dei film
  const [query, setQuery]= useState("");
  // creo una funzione che mi permetta di ordinare i film al click di un bottone
  const [sortByYear, setSortByYear] = useState({ order: 'asc', sorted: false });
  const [sortByRating, setSortByRating] = useState({ order: 'asc', sorted: false });
  const [selectedOption, setSelectedOption] = useState('');

  const handleChangeText = (e) => {
    const value = e.target.value;
    setQuery(value);
  } 
  
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
  //  //creo una funzione che mi riporti il valore dell'input in modo tale da poter filtrare l'array dei film //

  // use Memo è una hook di React che permette in questo caso di memorizzare il risultato di una funzione 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sortedMovies = useMemo(() => {
    let sorted = [...filteredMovies];
    if (sortByYear.sorted) {
      sorted = sorted.sort((a, b) => {
        return sortByYear.order === 'asc' ? a.year - b.year : b.year - a.year;
      });
    }
    if (sortByRating.sorted) {
      sorted = sorted.sort((a, b) => {
        return sortByRating.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      });
    }
    return sorted;
  }, [filteredMovies, sortByYear, sortByRating]);

  const toggleSortOrder = (type) => {
    if (type === 'year') {
      const newOrder = sortByYear.order === 'asc' ? 'desc' : 'asc';
      setSortByYear({ ...sortByYear, order: newOrder, sorted: true });
      setSortByRating({ ...sortByRating, sorted: false });
    } else if (type === 'rating') {
      setSortByRating({ ...sortByRating, order: sortByRating.order === 'asc' ? 'desc' : 'asc', sorted: true });
      setSortByYear({ ...sortByYear, sorted: false });
    }
  };
  // // creo una funzione che mi permetta di ordinare i film al clickdi un bottone //

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
      <MovieList 
        sortByYear={sortByYear} 
        sortByRating={sortByRating}
        toggleOrder={toggleSortOrder} 
        orderMovies={sortByYear.order}
        changeOption={handleOptionChange} 
        onSearch={handleChangeText} 
        loading={loading}>
        {sortedMovies .map((item, key) => (
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
      {/* aggiungo un form per la ricerca dei film tramite nome e per ordinarli in modo crescente o decrescente */}
      <form action="" className='mt-2 mb-2 mx-10'>
        <input type="text" placeholder='Search...' className='block shadow appearance-none border rounded w-full py-2 px-3 me-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={props.onSearch}/>
        
        {/* creo degli input type radiobox per ordinare tramite anno o rating */}
        <h6>Order by</h6>
        <div className='flex justify-between'>
            {/* orninare tramite anno */}
          <div className='me-5'>
            <input
              type="radio"
              id="ascYear"
              name="sortOrderYear"
              value="asc"
              checked={props.sortByYear.order === 'asc'}
              onChange={() => props.toggleOrder('year')}
            />
            <label className='mx-2' htmlFor="ascYear">Year &#8593; </label>
            <input
              type="radio"
              id="descYear"
              name="sortOrderYear"
              value="desc"
              checked={props.sortByYear.order === 'desc'}
              onChange={() => props.toggleOrder('year')}
            />
            <label className='mx-2' htmlFor="descYear">Year &#8595; </label>
          </div>

          {/* orninare tramite voto */}
          <div className='ms-5'>
            <input
              type="radio"
              id="ascRating"
              name="sortOrderRating"
              value="asc"
              checked={props.sortByRating.order === 'asc'}
              onChange={() => props.toggleOrder('rating')}
            />
            <label className='mx-2' htmlFor="ascRating">Rating &#8593;</label>

            <input
              type="radio"
              id="descRating"
              name="sortOrderRating"
              value="desc"
              checked={props.sortByRating.order === 'desc'}
              onChange={() => props.toggleOrder('rating')}
            />
            <label className='mx-2' htmlFor="descRating">Rating &#8595;g</label>
          </div>
        </div>
      {/* Fine del gruppo di radio button */}

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
