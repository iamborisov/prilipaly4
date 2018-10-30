<?php
// src/AppBundle/Entity/User.php

namespace App\Entity;

use FOS\UserBundle\Model\User as FOSUBUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="users")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User extends FOSUBUser
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="vk_id", type="string", length=255, nullable=true)
     */
    private $vkId;

    /**
     * @ORM\Column(name="vk_access_token", type="string", length=255, nullable=true)
     */
    private $vkAccessToken;

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $vkId
     * @return User
     */
    public function setVkId($vkId)
    {
        $this->vkId = $vkId;

        return $this;
    }

    /**
     * @return string
     */
    public function getVkId()
    {
        return $this->vkId;
    }

    /**
     * @param string $vkAccessToken
     * @return User
     */
    public function setVkAccessToken($vkAccessToken)
    {
        $this->vkAccessToken = $vkAccessToken;

        return $this;
    }

    /**
     * @return string
     */
    public function getVkAccessToken()
    {
        return $this->vkAccessToken;
    }
}