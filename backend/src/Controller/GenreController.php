<?php

namespace App\Controller;

use App\Repository\GenreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

class GenreController extends AbstractController
{
    private GenreRepository $genreRepository;
    private SerializerInterface $serializer;  // Aggiungi questa riga

    public function __construct(GenreRepository $genreRepository, SerializerInterface $serializer) // Aggiungi SerializerInterface qui
    {
        $this->genreRepository = $genreRepository;
        $this->serializer = $serializer; // Imposta la proprietà serializer
    }

    #[Route('/genres', methods: ['GET'])]
    public function listGenres(): JsonResponse
    {
        $genres = $this->genreRepository->findAll();
        $jsonData = $this->serializer->serialize($genres, 'json', ['groups' => ['default']]);
        return new JsonResponse($jsonData, 200, [], true);
    }
}
