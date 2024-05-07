interface GenreInterface {
    id:     number;
    name:   string;
}

interface GenresInterface extends Array<GenreInterface> {}

export {GenresInterface,GenreInterface};