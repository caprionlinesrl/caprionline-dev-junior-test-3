import React, { useEffect, useState } 	from 'react';

import Heading 							from './components/Heading';
import FilterMovies 					from './components/Movie/FilterMovie';
import Layout 							from './components/Layout';
import MovieItem 						from './components/Movie/MovieItem';
import MovieList 						from './components/Movie/MovieList';
import { getFormProps } 				from './services/form';
import { 
	apiFetchActors, 
	apiFetchGenres, 
	apiFetchMovies } 					from './api/backend';
import { 
	MovieInterface, MoviesInterface 
}						 				from './api/interface/movieInterface';
import { GenresInterface } 				from './api/interface/genreInterface';
import { ActorsInterface } 				from './api/interface/actorInterface';
import { FormPropsInterface } 			from './services/interface/formPropsInterface';

const App:React.FC = props => {
	const [movies, setMovies] 	= useState<MoviesInterface>([]); 
	const [genres, setGenres] 	= useState<GenresInterface>([]); 
	const [actors, setActors] 	= useState<ActorsInterface>([]); 
	const [loading, setLoading] = useState<boolean>(true);

	const init = ():void => {
		setLoading(true);
		Promise.all([fetchMovies(), fetchGenres(), fetchActors()])
			.then(() => setLoading(false))
			.catch(() => setLoading(false));
	};

	const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formProps:FormPropsInterface = getFormProps(event);
		const params:string = `${Object.keys(formProps)
			.filter((key) => formProps[key] !== '')
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formProps[key])}`)
			.join('&')}`;

		const fetchedMovies:MoviesInterface|null = await apiFetchMovies(params);
		if (fetchedMovies !== null) {
			setMovies(fetchedMovies);
		}
	};

	const fetchMovies = async () => {
		const fetchedMovies: MoviesInterface|null = await apiFetchMovies();
		if (fetchedMovies !== null) {
			setMovies(fetchedMovies);
		}
	};

	const fetchGenres = async () => {
		const fetchedGenres: GenresInterface|null = await apiFetchGenres();
		if (fetchedGenres !== null) {
			setGenres(fetchedGenres);
		}
	};

	const fetchActors = async () => {
		const fetchedActors: ActorsInterface|null = await apiFetchActors();
		if (fetchedActors !== null) {
			setActors(fetchedActors);
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<Layout>
			<Heading />
			<FilterMovies genres={genres} actors={actors} handleSubmitForm={handleSubmitForm} />
			{movies && movies.length > 0 ? (
				<MovieList loading={loading}>
					{movies.map((item: MovieInterface, key: number) => (
						<MovieItem key={key} {...item} />
					))}
				</MovieList>
			) : (
				'La ricerca non ha prodotto risultati'
			)}
		</Layout>
	);
};

export default App;