<?php

namespace App\Command;

use App\Entity\Promocode;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ImportPromocodeCommand extends Command implements ContainerAwareInterface
{
    private $container;

    protected static $defaultName = 'import:promocode';

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    protected function configure()
    {
        $this
            ->setDescription('Import promocodes')
            ->addArgument('file', InputArgument::REQUIRED, 'Filename (CSV)')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        $data = $this->getData($input->getArgument('file'));


        /** @var EntityManager $em */
        $em = $this->container->get('doctrine')->getManager();

        foreach ($data as $row) {
            $entity = new Promocode();
            $entity->setCode($row['code']);
            $em->persist($entity);
        }

        $em->flush();

        $io->success('Promocodes imported.');
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
                    'id' => (int) trim($data[0]),
                    'code' => trim($data[3]),
                ];
            }

            fclose($handle);
        }

        return $result;
    }
}
