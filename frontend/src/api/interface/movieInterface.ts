interface MovieInterface {
    id:             number;
    title:          string;
    imageUrl:       string;
    plot:           string;
    year:           number;
    releaseDate:    string;
    duration:       string;
    rating:         number;
    wikipediaUrl:   string;
}

interface MoviesInterface extends Array<MovieInterface> {}

export {MoviesInterface,MovieInterface};