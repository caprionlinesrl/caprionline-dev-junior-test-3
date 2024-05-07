//Utilizzo il mac per sviluppare, ma ho un server linux in casa sul quale faccio girare i progetti di sviluppo con docker
//preferisco questa soluzione perchè le prestazioni di docker su mac che gira con una macchina virtuale sono troppo lente, 
//rispetto alla soluzione di installarlo su una macchina fisica linux. Quindi questo è il mio ip    
const API_ENDPOINTS = {
    MOVIES: 'http://192.168.1.74:8000/movies',
    GENRES: 'http://192.168.1.74:8000/genres',
    ACTORS: 'http://192.168.1.74:8000/actors',
};


// const API_ENDPOINTS = {
//     MOVIES: 'http://localhost:8000/movies',
//     GENRES: 'http://localhost:8000/genres',
//     ACTORS: 'http://localhost:8000/actors',
// };
  
export default API_ENDPOINTS;