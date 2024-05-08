<?php

class MovieSearchParams
{
    private ?string $releaseDate;
    private ?string $rating;
    private ?int    $genreId;
    private ?int    $actorId;

    public static function create(array $params): self
    {
        $movieSearchParams                  = new self();
        $movieSearchParams->releaseDate     = $params['releaseDate'] ?? null;
        $movieSearchParams->rating          = $params['rating'] ?? null;
        $movieSearchParams->genreId         = $params['genreId'] ?? null;
        $movieSearchParams->actorId         = $params['actorId'] ?? null;
        return $movieSearchParams;
    }

    public function getReleaseDate(): ?string
    {
        return $this->releaseDate;
    }

    public function getRating(): ?string
    {
        return $this->rating;
    }

    public function getGenreId(): ?int
    {
        return $this->genreId;
    }
    public function getActorId(): ?int
    {
        return $this->actorId;
    }

    public function toArray(): array
    {
        $array = [            
            'releaseDate'       => $this->releaseDate,
            'rating'            => $this->rating,
            'genreId'           => $this->genreId,            
            'actorId'           => $this->actorId            
        ];
        return $array;
    }
}
