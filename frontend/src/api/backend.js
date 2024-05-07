const apiFetch = async  (url) => {	
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

const apiFetchGenres = async () => {		
    return fetch('http://79.43.214.148:8000/genres')
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

const apiFetchActors = async () => {		
    return fetch('http://79.43.214.148:8000/actors')
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

export {apiFetch, apiFetchGenres, apiFetchActors};