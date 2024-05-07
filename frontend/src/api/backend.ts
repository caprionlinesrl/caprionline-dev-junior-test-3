import API_ENDPOINTS        from "./apiEndpoints";
import { ActorsInterface }  from "./interface/actorInterface";
import { GenresInterface }  from "./interface/genreInterface";
import { MoviesInterface }  from "./interface/movieInterface";

const apiFetchMovies = async  (params?:string):Promise<MoviesInterface|null> => {	
    const url:string =  params === undefined ? API_ENDPOINTS.MOVIES : `${API_ENDPOINTS.MOVIES}?${params}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta HTTP');
            }
            return response.json();
        })
        .then(data => {
            return data;				
        })
        .catch(error => {
            console.error('Si è verificato un errore durante il recupero dei film:', error);	
            return null;	
        });
}

const apiFetchGenres = async ():Promise<GenresInterface|null> => {		
    return fetch(API_ENDPOINTS.GENRES)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta HTTP');
            }
            return response.json();
        })
        .then(data => {
            return data;			
        })
        .catch(error => {
            console.error('Si è verificato un errore durante il recupero dei film:', error);						
        });
}

const apiFetchActors = async ():Promise<ActorsInterface|null> => {		
    return fetch(API_ENDPOINTS.ACTORS)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta HTTP');
            }
            return response.json();
        })
        .then(data => {
            return data;	
        })
        .catch(error => {
            console.error('Si è verificato un errore durante il recupero dei film:', error);				
        });
}

export {apiFetchMovies, apiFetchGenres, apiFetchActors};