<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\DBAL\ForwardCompatibility\Result;
use MovieSearchParams;

/**
 * @extends ServiceEntityRepository<Movie>
 *
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Movie::class);
    }

    public function findByFilter(MovieSearchParams $filters, ?bool $toArray = false): array
{
        $qb = $this->createQueryBuilder('m');

        if ($filters->getGenreId() !== null) {
            $qb->innerJoin('m.movieGenres', 'mg')->andWhere('mg.genre = :genreId')->setParameter('genreId', $filters->getGenreId());
        }

        if ($filters->getActorId() !== null) {
            $qb->innerJoin('m.movieActors', 'ma')->andWhere('ma.actor = :actorId')->setParameter('actorId', $filters->getActorId());
        }

        if ($filters->getReleaseDate() !== null) {
            $qb->addOrderBy('m.releaseDate', $filters->getReleaseDate());
        }

        if ($filters->getRating() !== null) {
            $qb->addOrderBy('m.rating', $filters->getRating());
        }

        $query = $qb->getQuery();

        return $toArray ? $query->getArrayResult() : $query->getResult();
    }

    //    /**
    //     * @return Movie[] Returns an array of Movie objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Movie
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
