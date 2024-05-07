import React, { useEffect, useState } 	from 'react';

import Heading 							from './components/Heading';
import FilterMovies 					from './components/FilterMovie';
import Layout 							from './components/Layout';
import MovieItem 						from './components/Movie/MovieItem';
import MovieList 						from './components/Movie/MovieList';
import { getFormProps } 				from './services/form';
import { apiFetch } 					from './api/backend';
import API_ENDPOINTS 					from './api/apiEndpoints';

const App = props => {
	const [movies, setMovies] 	= useState([]);
	const [genres, setGenres] 	= useState([]);
	const [actors, setActors] 	= useState([]);
	const [loading, setLoading] = useState(true);

	const init = () => {		
		setLoading(true);
    	Promise.all([fetchMovies(), fetchGenres(), fetchActors()]) 
        .then(()  => setLoading(false))
        .catch(() => setLoading(false));
	}

	const handleSubmitForm = async (event) => {
		const formProps = await getFormProps(event);		
		const url 		= `${API_ENDPOINTS.MOVIES}?${Object.keys(formProps).filter(key => formProps[key] !== '') 
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formProps[key])}`)
		.join('&')}`;

		const movies = await apiFetch(url);
		if( movies !==  null) {
			setMovies(movies);				
		}			
	}

	const fetchMovies = async  () => {		
		const movies = await apiFetch(API_ENDPOINTS.MOVIES);
		if( movies !==  null) {
			setMovies(movies);				
		}
	}

	const fetchGenres = async () => {		
		const genres = await apiFetch(API_ENDPOINTS.GENRES);
		if( genres !==  null) {
			setGenres(genres);				
		}
	}

	const fetchActors = async () => {		
		const actors = await apiFetch(API_ENDPOINTS.ACTORS);
		if( actors !==  null) {
			setActors(actors);				
		}
	}

	useEffect(() => {
		init();		
	}, []);

	return (
		<Layout>
			<Heading/>
			<FilterMovies genres={genres} actors={actors} handleSubmitForm={handleSubmitForm} />
			{ movies && movies.length > 0 ?
				<MovieList loading={loading}>
					{movies.map((item, key) => (
						<MovieItem key={key} {...item} />
					))}
				</MovieList>
				: 'La ricerca non ha prodotto risultati'
			}
		</Layout>
	);
};

export default App;