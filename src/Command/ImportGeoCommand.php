<?php

namespace App\Command;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\Region;
use App\Entity\Shop;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class ImportGeoCommand extends Command implements ContainerAwareInterface
{
    private $container;

    protected static $defaultName = 'import:geo';

    private $areas = [];
    private $cities = [];

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    protected function configure()
    {
        $this
            ->setDescription('Import geodata CSV')
            ->addArgument('file', InputArgument::REQUIRED, 'Filename')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        $data = $this->getData($input->getArgument('file'));

        $this->importRegion($data);
        $this->importArea($data);
        $this->importCity($data);
        $this->importShop($data);

        $io->success('Import complete.');
    }

    private function importRegion(array $data)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine')->getManager();

        $regions = ['ЦФО', 'СЗФО', 'УФО'];

        foreach ($regions as $region) {
            $entity = new Region();
            $entity->setName($region);
            $em->persist($entity);
        }
    }

    private function importArea(array $data)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine')->getManager();

        $areas = array_unique(array_column($data, 'area'));

        foreach ($areas as $row => $area) {
            $entity = new Area();
            $entity->setName($area);
            $em->persist($entity);

            $this->areas[$area] = $entity;

            echo "AREA: $area\r\n";
        }

        $em->flush();
    }

    private function importCity(array $data)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine')->getManager();

        $cities = array_unique(array_column($data, 'city'));

        foreach ($cities as $row => $city) {
            $area = $this->areas[$data[$row]['area']];

            $entity = new City();
            $entity->setName($city);
            $entity->setArea($area);
            $em->persist($entity);

            $this->cities[$city] = $entity;

            echo "CITY: $city IN {$area->getName()}\r\n";
        }

        $em->flush();
    }

    private function importShop(array $data)
    {
        /** @var EntityManager $em */
        $em = $this->container->get('doctrine')->getManager();

        foreach ($data as $row => $shop) {
            $city = $this->cities[$shop['city']];

            $entity = new Shop();
            $entity->setAddress($shop['address']);
            $entity->setCity($city);
            $entity->setCoordLat($shop['lat']);
            $entity->setCoordLng($shop['lng']);
            $entity->setSchedule($shop['schedule']);
            $entity->setShopId($shop['id']);
            $em->persist($entity);

            echo "SHOP: {$shop['address']}\r\n";
        }

        $em->flush();
    }

    private function getData(string $filename): array
    {
        $result = [];

        if (($handle = fopen($filename, "r")) !== FALSE) {

            while (($data = fgetcsv($handle, 0, ';')) !== FALSE) {
                if (!is_numeric($data[0])) {
                    continue;
                }

                $result[] = [
                    'id' => trim($data[0]),
                    'city' => trim($data[1]),
                    'address' => trim($data[2]),
                    'schedule' => trim($data[3]),
                    'lng' => trim($data[4]),
                    'lat' => trim($data[5]),
                    'area' => trim($data[6]),
                ];
            }

            fclose($handle);
        }

        return $result;
    }
}
