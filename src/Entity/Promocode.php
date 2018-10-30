<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PromocodeRepository")
 */
class Promocode
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $code;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Participant", mappedBy="promocode", cascade={"persist", "remove"})
     */
    private $participant;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getParticipant(): ?Participant
    {
        return $this->participant;
    }

    public function setParticipant(?Participant $participant): self
    {
        $this->participant = $participant;

        // set (or unset) the owning side of the relation if necessary
        $newPromocode = $participant === null ? null : $this;
        if ($newPromocode !== $participant->getPromocode()) {
            $participant->setPromocode($newPromocode);
        }

        return $this;
    }

    public function __toString()
    {
        return (string) $this->getCode();
    }
}
