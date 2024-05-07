<?php

namespace App\Controller;

use App\Repository\GenreRepository;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityNotFoundException;
use Exception;
use MovieSearchParams;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class GenreController extends AbstractController
{
    public function __construct(     
        private GenreRepository     $genreRepository,
        private LoggerInterface     $logger
    ) {}

    #[Route('/genres', methods: ['GET'])]
    public function genres(
        Request $request
    ): JsonResponse
    {
        try {           
            //L'entità è molto piccola ha un solo campo, evito di creare un DTO per non sovrastrutturare il progetto di oggetti
            $order = $request->query->get('order', 'asc');
            $genres = $this->genreRepository->findByParams($order, true);
            return $this->json($genres);
        } catch (EntityNotFoundException $e) {
            $this->logger->error("Data not found - INPUT: order: $order. \n" . $e->getMessage(). ' - FILE: '. $e->getTraceAsString() );
            return $this->json(['error' => 'Data not found'], Response::HTTP_NOT_FOUND);
        } catch (\Exception $e) {
            $this->logger->error("Error - INPUT: order: $order. \n" . $e->getMessage(). ' - FILE: '. $e->getTraceAsString() );
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}