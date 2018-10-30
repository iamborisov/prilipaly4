<?php

namespace App\Repository;

use App\Entity\Promoaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Promoaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method Promoaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method Promoaction[]    findAll()
 * @method Promoaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PromoactionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Promoaction::class);
    }

//    /**
//     * @return Promoaction[] Returns an array of Promoaction objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Promoaction
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
