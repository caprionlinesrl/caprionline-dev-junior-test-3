<?php

namespace App\Entity;

use App\Repository\GenreRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GenreRepository::class)]
#[ORM\Table("genres")]
class Genre
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['default'])]  // Assicurati che l'id sia incluso nel gruppo di serializzazione "default"
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['default'])]  // Assicurati che il nome sia incluso nel gruppo di serializzazione "default"
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
}
