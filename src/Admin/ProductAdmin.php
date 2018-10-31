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

final class ProductAdmin extends AbstractAdmin
{

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
			->add('id')
			->add('name')
			->add('priority')
			;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
			->add('id')
            ->add('promoaction')
			->add('name')
			->add('description')
			->add('priority')
			->add('_action', null, [
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ],
            ]);
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        // get the current Image instance
        $image = $this->getSubject();

        // use $fileFieldOptions so we can add other options to the field
        $fileFieldOptions = ['required' => false];
        if ($image && ($webPath = $image->getWebPath())) {
            // get the container so the full path to the image can be set
            $container = $this->getConfigurationPool()->getContainer();
            $fullPath = $container->get('request_stack')->getCurrentRequest()->getBasePath().'/'.$webPath;

            // add a 'help' option containing the preview's img tag
            $fileFieldOptions['help'] = '<img src="'.$fullPath.'" class="admin-preview" style="max-width: 100%; border: 3px double #666" />';
        }

        $formMapper
            ->add('name')
            ->add('description')
            ->add('priority')
            ->add('promoaction', EntityType::class, array(
                'class' => 'App:Promoaction'
            ))
            ->add('regions', EntityType::class, array(
                'class' => 'App:Region',
                'multiple' => true
            ))
            ->add('file', FileType::class, $fileFieldOptions)
        ;
    }

    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
			->add('id')
			->add('name')
			->add('priority')
			;
    }

    public function prePersist($entity)
    {
        $this->manageFileUpload($entity);
    }

    public function preUpdate($entity)
    {
        $this->manageFileUpload($entity);
    }

    private function manageFileUpload($entity)
    {
        if ($entity->getFile()) {
            $entity->upload();
        }
    }
}
