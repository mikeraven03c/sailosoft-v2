<?php

namespace Modules\CustomEntity\Data\Resources\Commerce;

use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;
use Modules\CustomEntity\Data\Resources\BaseResourceData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;

class CommereProductResourceData extends BaseResourceData
{
    protected string $resource = 'product';

    public function setup(CustomEntityPropertyData $propertyData)  : CustomEntityPropertyData
    {
        return $propertyData;
    }
}
