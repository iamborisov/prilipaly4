<?php

namespace App\Controller;

use App\Entity\Area;
use App\Entity\City;
use App\Entity\Participant;
use App\Entity\Product;
use App\Entity\Promocode;
use App\Entity\Region;
use App\Entity\Shop;
use App\Form\ParticipantFormType;
use Doctrine\DBAL\Connection;
use Maxmind\Bundle\GeoipBundle\Service\GeoipManager;
use Maxmind\lib\GeoIp;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Cache\Adapter\AdapterInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(Request $request, AdapterInterface $cache)
    {
        $form = $this->createForm(ParticipantFormType::class);

        $geo = $this->getGeo($request->getClientIp());

        return $this->render('default/index.html.twig', [
            'action' => $this->generateUrl('participate'),
            'form' => $form->createView(),

            'shops' => $this->getShops($cache, $geo),
            'cities' => $this->getCities($cache, $geo),
            'products' => $this->getProducts($cache, $geo->getArea()->getRegion()),
            'promoactions' => $this->getPromoactions($cache),
            'regions' => $this->getRegions($cache),
            'geo' => [
                'go' => $this->getGoCode($geo),
                'city' => $geo,
                'area' => $geo->getArea(),
                'region' => $geo->getArea()->getRegion()
            ]
        ]);
    }

    /**
     * @Route("/app", name="app")
     */
    public function app()
    {
        return $this->redirect($this->generateUrl('index') . '#?sectionApp');
    }

    /**
     * @Route("/map", name="map", methods={"POST"})
     */
    public function map(Request $request, AdapterInterface $cache)//, GeoipManager $geoip)
    {
        //city, area, address
        $search = $request->get('shops');

        $geo = $this->searchGeo($search['city'], $search['area'], $search['address']);
        if (!$geo) {
            $geo = $this->getGeo($request->getClientIp());
        }

        return new JsonResponse([
            'result' => 'ok',
            'gocodeName' => $this->getGoCode($geo),
            'shopsArr' => $this->getShops($cache, $geo)
        ]);
    }

    /**
     * @Route("/area", name="area", methods={"POST"})
     */
    public function area(Request $request, AdapterInterface $cache)//, GeoipManager $geoip)
    {
        $region = $this->getDoctrine()->getRepository('App:Region')->getByName($request->get('area'));

        if (!$region) {
            $region = $this->getGeo($request->getClientIp())->getArea()->getRegion();
        }

        return new JsonResponse([
            'result' => 'ok',
            'products' => $this->getProducts($cache, $region)
        ]);
    }

    /**
     * @Route("/participate", name="participate", methods={"POST"})
     */
    public function participate(Request $request, \Swift_Mailer $mailer)
    {
        try {
            if (!$request->get('agree')) {
                return new JsonResponse(['result' => 'error', 'message' => 'You must agree to the terms']);
            }

            /** @var Promocode $promocode */
            $promocode = $this->getDoctrine()
                ->getRepository('App:Promocode')
                ->findOneBy(
                    [
                        'code' => strtoupper($request->get('promocode')),
                    ]
                );

            if (!$promocode) {
                return new JsonResponse(['result' => 'error', 'message' => 'Invalid code']);
            }

            $isTest = in_array($promocode->getCode(), ['TESTTEST1', 'TESTTEST2', 'TESTTEST3']);

            if ($promocode->getParticipant()) {
                if ($isTest) {
                    $this->getDoctrine()->getManager()->remove($promocode->getParticipant());
                    $this->getDoctrine()->getManager()->flush();
                } else {
                    return new JsonResponse(['result' => 'error', 'message' => 'Already used']);
                }
            }

            $form = $this->createForm(ParticipantFormType::class);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                /** @var Participant $participant */
                $participant = $form->getData();

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($participant);
                $entityManager->flush();

                $promocode->setParticipant($participant);
                $entityManager->flush();

                $this->sendEmails($mailer, $participant);

                if ($isTest) {
                    $entityManager->remove($participant);
                    $entityManager->flush();
                }

                return new JsonResponse(['result' => 'ok']);
            }
        } catch (\Exception $e) {
//            return new JsonResponse(['result' => 'error', 'message' => $e->getMessage()]);
            return new JsonResponse(['result' => 'error']);
        }
    }

    private function sendEmails(\Swift_Mailer $mailer, Participant $participant)
    {
        /**
         * Message to user
         */
        $message = (new \Swift_Message('Привет от прилипал!'))
            ->setFrom('no-reply@dixy.ru')
            ->setTo($participant->getEmail())
            ->setBody(
                $this->renderView(
                    'emails/participant.txt.twig',
                    [
                        'name' => $participant->getFullName(),
                        'address' => $participant->getFullAddress(),
                    ]
                ),
                'text/html'
            );
        $mailer->send($message);

        /**
         * Message to admin
         */
        $message = (new \Swift_Message('Запрос на отправку приза'))
            ->setFrom('no-reply@dixy.ru')
            ->setTo('prilipaly4@gmail.com')
            ->setBody(
                $this->renderView(
                    'emails/manager.txt.twig',
                    [
                        'name' => $participant->getFullName(),
                        'address' => $participant->getFullAddress(),
                    ]
                ),
                'text/html'
            );
        $mailer->send($message);
    }

    private function getShops(AdapterInterface $cache, City $geo): array
    {
        $shopsCache = $cache->getItem('shops' . $geo->getId());
        if (!$shopsCache->isHit()) {
            $shops = [];

            /** @var Shop $shop */
            foreach ($this->getDoctrine()->getRepository('App:Shop')->findBy(['city' => $geo->getId()]) as $shop) {
                $shops[] = $shop->toArray();
            }

            $shopsCache->set($shops);
            $cache->save($shopsCache);
        }

        return $shopsCache->get();
    }

    private function getCities(AdapterInterface $cache, City $geo): array
    {
        $citiesCache = $cache->getItem('cities');
        if (!$citiesCache->isHit()) {
            $cities = [];

            /** @var City $city */
            foreach ($this->getDoctrine()->getRepository('App:City')->findAll() as $city) {
                if (!$city->getArea()) {
                    continue;
                }

                if (!isset($cities[$city->getArea()->getName()])) {
                    $cities[$city->getArea()->getName()] = [
                        'geostatus' => false,
                        'areas' => [],
                    ];
                }
                $cities[$city->getArea()->getName()]['areas'][] = $city->getName();
            }

            $citiesCache->set($cities);
            $cache->save($citiesCache);
        }

        $result = $citiesCache->get();

        $result[$geo->getArea()->getName()]['geostatus'] = true;

        return $result;
    }

    private function getProducts(AdapterInterface $cache, Region $geo): array
    {
        $productsCache = $cache->getItem('products' . $geo->getId());
        if (1||!$productsCache->isHit()) {
            $products = [];

            /** @var Promoaction $promoaction */
            foreach ($this->getDoctrine()->getRepository('App:Promoaction')->findAll() as $promoaction) {
                $products[(int) $promoaction->getId()] = [];
            }

            /** @var Product $product */
            foreach ($this->getDoctrine()->getRepository('App:Product')->getAll() as $product) {
                if (!$product->getPromoaction()) {
                    continue;
                }

                foreach ($product->getRegions() as $region) {
                    if ($region->getId() == $geo->getId()) {
                        $products[$product->getPromoaction()->getId()][] = $product->toArray();
                    }
                }
            }

            $productsCache->set($products);
            $cache->save($productsCache);
        }

        return $productsCache->get();
    }

    private function getPromoactions(AdapterInterface $cache): array
    {
        $promoactionsCache = $cache->getItem('promoactions');
        if (!$promoactionsCache->isHit()) {
            $promoactionsCache->set($this->getDoctrine()->getRepository('App:Promoaction')->findAll());
            $cache->save($promoactionsCache);
        }

        return $promoactionsCache->get();
    }

    private function getRegions(AdapterInterface $cache): array
    {
        $regionsCache = $cache->getItem('regions');
        if (!$regionsCache->isHit()) {
            $regionsCache->set($this->getDoctrine()->getRepository('App:Region')->findAll());
            $cache->save($regionsCache);
        }

        return $regionsCache->get();
    }

    private function getGeo($ip): City
    {
        $geoip = new \Maxmind\Bundle\GeoipBundle\Service\GeoipManager(__DIR__ . '/../../vendor/maxmind/geoip/data/GeoLiteCity.dat');
        $geoip->lookup($ip);

        /** @var Connection $conn */
        $conn = $this->getDoctrine()->getConnection();

        $stm = $conn->createQueryBuilder()
            ->select('s.city_id', 'SQRT( POW(s.coord_lng - :lng, 2) + POW(s.coord_lat - :lat, 2) ) as dist')
            ->from('shop', 's')
            ->orderBy('dist', 'ASC')
            ->setParameter('lng', $geoip->getLongitude())
            ->setParameter('lat', $geoip->getLatitude())
            ->setMaxResults(1)
            ->execute();

        $result = $stm->fetchAll();

        if (isset($result[0]['city_id'])) {
            $city = $this->getDoctrine()->getRepository('App:City')->find($result[0]['city_id']);
        } else {
            $city = $this->getDoctrine()->getRepository('App:City')->find(1);
        }

        return $city;
    }

    private function getGoCode(City $geo)
    {
        return "Россия, " . $geo->getName();
    }

    private function searchGeo($areaName, $cityName, $address)
    {
        $result = null;

        if ($address) {
            /** @var Shop $shop */
            if ($shop = $this->getDoctrine()->getRepository('App:Shop')->getByAddress($address)) {
                $result = $shop->getCity();
            }
        }

        if ($cityName && !$result) {
            $result = $this->getDoctrine()->getRepository('App:City')->getByName($cityName);
        }

        if ($areaName && !$result) {
            /** @var Area $area */
            if ($area = $this->getDoctrine()->getRepository('App:Area')->getByName($cityName)) {
                $cities = $area->getCities();
                if (count($cities)) {
                    $result = reset($cities);
                }
            }
        }

        return $result;
    }

}
