<?php

namespace App\Controller;

use App\Repository\ActorRepository;
use App\Repository\GenreRepository;
use Doctrine\ORM\EntityNotFoundException;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ActorController extends AbstractController
{
    public function __construct(     
        private ActorRepository     $actorRepository,
        private LoggerInterface     $logger
    ) {}

    #[Route('/actors', methods: ['GET'])]
    public function actors(
        Request $request
    ): JsonResponse
    {
        try {           
            //L'entità è molto piccola ha un solo campo, evito di creare un DTO per non sovrastrutturare il progetto di oggetti
            $order = $request->query->get('order', 'asc');
            $genres = $this->actorRepository->findByParams($order, true);
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