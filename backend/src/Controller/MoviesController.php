<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

class MoviesController extends AbstractController
{
    private MovieRepository $movieRepository;
    private SerializerInterface $serializer;

    public function __construct(MovieRepository $movieRepository, SerializerInterface $serializer)
    {
        $this->movieRepository = $movieRepository;
        $this->serializer = $serializer;
    }

    #[Route('/movies', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $sortParam = $request->query->get('sort');
        $genreName = $request->query->get('genre');

        $queryBuilder = $this->movieRepository->createQueryBuilder('m')
            ->leftJoin('m.movieGenres', 'mg')
            ->leftJoin('mg.genre', 'g');

        if ($sortParam === 'newest') {
            $queryBuilder->orderBy('m.releaseDate', 'DESC');
        } elseif ($sortParam === 'rating_asc') {
            $queryBuilder->orderBy('m.rating', 'ASC');
        } elseif ($sortParam === 'rating_desc') {
            $queryBuilder->orderBy('m.rating', 'DESC');
        }

        if ($genreName) {
            $queryBuilder->andWhere('g.name = :genreName')
                         ->setParameter('genreName', $genreName);
        }

        $movies = $queryBuilder->getQuery()->getResult();
        $jsonData = $this->serializer->serialize($movies, 'json', ['groups' => ['default']]);
    
        return new JsonResponse($jsonData, 200, [], true);
    }
}
