<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private GenreRepository $genreRepository, 
        private SerializerInterface $serializer
    ) {}

    #[Route('/movies', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $movies = $this->movieRepository->findAll();
        $genres = $this->genreRepository->findAll();
        $data = $this->serializer->serialize(["movies" => $movies, "genres" => $genres], "json", ["groups" => "default"]);

        return new JsonResponse($data, json: true);
    }

    #[Route('/movies/search', methods: ['GET'])]
    public function filter_by( #[MapQueryParameter] string $filter_by, #[MapQueryParameter] string $order): JsonResponse
    {  
        switch($filter_by){
            case 'recent':
                $movies = $this->movieRepository->filterBy('releaseDate', $order);
                break;
            case 'rating':
                $movies = $this->movieRepository->filterBy('rating', $order);
                break;
            default: 
                $movies = $this->movieRepository->findAll();
        }

        $data = $this->serializer->serialize($movies, "json", ["groups" => "default"]);
        return new JsonResponse($data, json: true);
    }

}
