<?php

namespace App\Admin;

use App\Form\PromoactionType;
use Doctrine\ORM\EntityManager;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\Filter\ChoiceType;
use Sonata\AdminBundle\Form\Type\ModelAutocompleteType;
use Sonata\AdminBundle\Form\Type\ModelListType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;

final class ParticipantAdmin extends AbstractAdmin
{

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
			->add('id')
            ->add('promocode.code')
            ->add('name')
            ->add('surname')
            ->add('patronymic')
            ->add('email')
            ->add('phone')
			;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
			->add('id')
            ->add('promocode.code')
            ->add('name')
            ->add('surname')
            ->add('patronymic')
            ->add('email')
            ->add('phone')
			->add('_action', null, [
                'actions' => [
                    'show' => [],
                ],
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
    }

    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
			->add('id')
            ->add('promocode.code')
            ->add('name')
            ->add('surname')
            ->add('patronymic')
            ->add('email')
            ->add('phone')
            ->add('zip')
            ->add('region')
            ->add('city')
            ->add('street')
            ->add('house')
            ->add('apartment')
			;
    }
}
