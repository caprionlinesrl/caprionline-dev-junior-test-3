interface ActorInterface {
    id:     number;
    name:   string;
}

interface ActorsInterface extends Array<ActorInterface> {}

export {ActorsInterface,ActorInterface};