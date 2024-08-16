<?php

namespace Modules\CustomEntity;

use Illuminate\Database\Eloquent\Model;
use Stancl\VirtualColumn\VirtualColumn;

class CustomEntity extends Model
{
    use VirtualColumn;

    const PREFIX_TABLE = 'entity_';
    const COLUMNS = 'columns';
    const DISPLAY_COLUMNS = 'display_columns';

    const BLOCK_TYPE_DEFAULT = 'default';
    const BLOCK_TYPE_SELECT = 'select';

    const DATA_TYPES = [
        self::DATA_TYPE_INTEGER => 'Integer',
        self::DATA_TYPE_VARCHAR  => 'Varchar',
        self::DATA_TYPE_BOOLEAN  => 'Boolean',
        self::DATA_TYPE_DOUBLE  => 'Double',
        self::DATA_TYPE_TEXT  => 'Text',
        self::DATA_TYPE_DATE_TIME  => 'Date Time',
    ];

    const DATA_TYPE_INTEGER  = 'int';
    const DATA_TYPE_VARCHAR  = 'varchar';
    const DATA_TYPE_BOOLEAN  = 'boolean';
    const DATA_TYPE_DOUBLE  = 'double';
    const DATA_TYPE_TEXT  = 'text';
    const DATA_TYPE_DATE_TIME  = 'datetime';

    const COLUMN_PROPERTY_RULES = 'rules';
    const COLUMN_PROPERTY_COLUMN_NAME = 'column_name';
    const COLUMN_PROPERTY_DATA_TYPE = 'data_type';
    const COLUMN_PROPERTY_LENGTH = 'length';
    const COLUMN_PROPERTY_LABEL = 'label';
    const COLUMN_PROPERTY_DEFAULT = 'default';

    const PROPERTY_ENTITY = 'entity';
    const PROPERTY_NAME = 'name';
    const PROPERTY_SLUG = 'slug';
    const PROPERTY_NAVIGATION = 'navigation';
    const PROPERTY_GROUP = 'group';
    const PROPERTY_IS_ACTIVE = 'is_active';
    const PROPERTY_COLUMNS = 'columns';
    const PROPERTY_DISPLAY_COLUMNS = self::DISPLAY_COLUMNS;
    const PROPERTY_PRIORITY = 'priority';

    const PROPERTY_COLUMN_TYPE = 'type';
    const PROPERTY_COLUMN_DATA  = 'data';


    public $guarded = [];

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'entity',
            'slug',
            'name',
            'navigation',
            'group',
            'priority',
            'is_active',
        ];
    }

    public function entityColumn()
    {
        return $this->entity;
    }

    public function getCustomFields()
    {
        return $this->{self::COLUMNS};
    }
    public function getDisplayCustomFields()
    {
        return $this->{self::DISPLAY_COLUMNS};
    }

    public function entityTable()
    {
        return self::PREFIX_TABLE . $this->entity;
    }

    public function scopeNavigation($query, $navigation)
    {
        $query->where('navigation', $navigation);

        return $query;
    }

    /**
     *
     */

    public function entitiesColumn()
    {
    }
}
