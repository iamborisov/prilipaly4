<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ShopRepository")
 */
class Shop
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $schedule;

    /**
     * @ORM\Column(type="float")
     */
    private $coord_lng;

    /**
     * @ORM\Column(type="float")
     */
    private $coord_lat;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\City", inversedBy="shops")
     */
    private $city;

    /**
     * @ORM\Column(type="integer")
     */
    private $shop_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getSchedule(): ?string
    {
        return $this->schedule;
    }

    public function setSchedule(string $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getCoordLng(): ?float
    {
        return $this->coord_lng;
    }

    public function setCoordLng(float $coord_lng): self
    {
        $this->coord_lng = $coord_lng;

        return $this;
    }

    public function getCoordLat(): ?float
    {
        return $this->coord_lat;
    }

    public function setCoordLat(float $coord_lat): self
    {
        $this->coord_lat = $coord_lat;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getShopId(): ?int
    {
        return $this->shop_id;
    }

    public function setShopId(int $shop_id): self
    {
        $this->shop_id = $shop_id;

        return $this;
    }

    public function toArray(): array
    {
        return [
            "id"        => $this->getShopId(),
            "altitude"  => $this->getCoordLng(),
            "longitude" => $this->getCoordLat(),
            "time"      => $this->getSchedule(),
            "phone"     => "",
            "label"     => $this->getAddress()
        ];
    }

    public function __toString()
    {
        return '#' . $this->getId(). ': ' . $this->getAddress();
    }
}
