<?php

namespace App\Controller;
use App\Entity\MovieGenre;
use App\Repository\MovieRepository;
use App\Repository\GenreRepository;
use App\Repository\MovieGenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;


class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private GenreRepository $genreRepository,
        private MovieGenreRepository $movieGenreRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/movies', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {   
        $dataQuery=$request->query->get('data');
        if($dataQuery == 'recent'){
            $movies = $this->movieRepository->findBy(array(),  array('year' => 'DESC'));
        } elseif($dataQuery == 'highest'){
            $movies = $this->movieRepository->findBy(array(),  array('rating' => 'DESC'));
        } elseif($dataQuery == 'lowest'){
            $movies = $this->movieRepository->findBy(array(),  array('rating' => 'ASC'));
        }
         elseif(is_numeric($dataQuery)){
   
            $movies = $this->movieRepository->findAll();
         }
         else{
            $movies = $this->movieRepository->findAll();
        }  
        $data = $this->serializer->serialize($movies,"json", ["groups" => "default"]);
        return new JsonResponse($data, json: true);
    }


}
