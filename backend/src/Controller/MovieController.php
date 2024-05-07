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

class MovieController extends AbstractController
{
    public function __construct(
        private MovieRepository     $movieRepository,
        private GenreRepository     $genreRepository,
        private SerializerInterface $serializer,
        private LoggerInterface     $logger
    ) {}

    #[Route('/movies', methods: ['GET'])]
    public function list(
        Request $request
    ): JsonResponse
    {

        try {
            $filters                = [];            
            if( !empty( $request->query->get('order') ) ) {
                $explode                = explode( '_', $request->query->get('order'));
                $filters[$explode[0]]   = $explode[1];
            }              
            $filters['genreId']     = $request->query->get('genre', null );
            $filters['actorId']     = $request->query->get('actor', null );            

            /* 
                Essendo il metodo findByFilter riutilizzabile in altri parti del codice, 
                è preferibile creare un array con i valori da passare, cosi da rendere il DTO riutilizzabile in più contesti. 
                E cosi permette la manipolazione del dato.
                Altri approcci: 
                    1. Creazione di DTO utilizzando i valori GET direttamente non permette di manipolare i dati se necessario prima di passarli al DTO, ad esempio se ho necessita in uno dei campi di recuperare tramite entita un dato ad esso collegato
                    2. Passaggio dell'intero oggetto Request al DTO: Rende il DTO meno riutilizzabile
            */
            $movieSearchparams      = MovieSearchParams::create($filters);         
            $movies                 = $this->movieRepository->findByFilter($movieSearchparams, true);

            /* 
                Vantaggi dell'Uso di Array Associativi
                Performance: L'uso di array riduce l'overhead della creazione di oggetti, in questo conteto dove l'api deve restituire il risultato senza manipolarlo è più corretto.
                Semplicità: Gli array sono spesso più semplici da gestire e trasformare in altre strutture
                $data           = $this->serializer->serialize($movies, "json", ["groups" => "default"]);
            */

            /* Se non si vuole utilizzare il bundle cors
                $response = new JsonResponse();
                $response->headers->set('Access-Control-Allow-Origin', 'http://79.43.214.148:5173');
                $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
                $response->setContent($data);
                return $response;
            */

            return $this->json($movies);
        } catch (EntityNotFoundException $e) {
            $this->logger->error('Data not found - INPUT: '.print_r($movieSearchparams->toArray(),true) . $e->getMessage(). ' - FILE: '. $e->getTraceAsString() );
            return $this->json(['error' => 'Data not found'], Response::HTTP_NOT_FOUND);     
        } catch (Exception $e) {
            $this->logger->error('Error - INPUT: '.print_r($movieSearchparams->toArray(),true) . $e->getMessage(). ' - FILE: '. $e->getTraceAsString() );
            return $this->json(['error' => 'Internal server error'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        //QueryException e PDOException estendono Exception quindi non le intercetto in modo differente ma le gestisco con lo stesso catch
        //In caso in una delle eccezioni fosse necessario fare una gestione particolare aggiungiamo il catch specifico
    }


}
