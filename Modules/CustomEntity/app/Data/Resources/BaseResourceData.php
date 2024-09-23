<?php

namespace Modules\CustomEntity\Data\Resources;

use Modules\CustomEntity\CustomEntity;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;

abstract class BaseResourceData
{
    protected string $resource;

    protected CustomEntityPropertyData $propertyData;

    public function __invoke(): CustomEntityPropertyData
    {
        return $this->property();
    }

    public static function instance()
    {
        return (new static)->setPropertyData();
    }

    public function property() : CustomEntityPropertyData
    {
        return $this->setup(
            CustomEntityPropertyData::fromResourceName($this->resource)
        );
    }

    public function setPropertyData()
    {
        $this->propertyData = $this->property();
        return $this;
    }

    public function setup(CustomEntityPropertyData $propertyData)  : CustomEntityPropertyData
    {
        return $propertyData;
    }

    public function updateOrCreate()
    {
        CustomEntity::updateOrCreate([
            CustomEntity::PROPERTY_SLUG => $this->propertyData->slug
        ], $this->propertyData->toArray());
    }
}
