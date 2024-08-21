<?php

namespace Modules\CustomEntity\Data\Resources\Crm;

use Modules\CustomEntity\Data\CustomEntity\CustomEntityPropertyData;
use Modules\CustomEntity\Data\CustomEntity\CustomEntityColumnPropertyData;

class CRMIssueResourceData extends CRMBaseResourceData
{
    protected string $resource = 'comment';

    public function setup(CustomEntityPropertyData $propertyData)  : CustomEntityPropertyData
    {
        return $propertyData->setColumns(
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Type',
                column_name: 'resource_type'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Resource Id',
                column_name: 'resource_id'
            ),
            CustomEntityColumnPropertyData::make()->setData(
                label: 'Name',
                column_name: 'name',
                // rules: 'required'
            ),
        );
    }
}
