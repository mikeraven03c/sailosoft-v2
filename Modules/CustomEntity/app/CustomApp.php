<?php

namespace Modules\CustomEntity;

use Laravel\Scout\EngineManager;
use Laravel\Scout\Engines\Engine;
use Illuminate\Database\Eloquent\Model;
use Stancl\VirtualColumn\VirtualColumn;

class CustomApp extends Model
{
    use \Laravel\Scout\Searchable;
    use VirtualColumn;

    public $guarded = [];

    public $searchEngine = 'virtual';
    const PREFIX_TABLE = CustomEntity::PREFIX_TABLE;

    public static function getCustomColumns(): array
    {
        return [
            'id',
        ];
    }

    public function toSearchableArray(): array
    {
        $array = $this->toArray();

        // return [
        //     'id' => $this->id,
        //     'name' => $this->name,
        //     'label' => $this->label
        // ];

        return $array;
    }

    /**
     * @method \Laravel\Scout\Searchable::search
     */
    public function virtualSearch($query = '', $callback = null)
    {
        return app(\Laravel\Scout\Builder::class, [
            'model' => $this,
            'query' => $query,
            'callback' => $callback,
            'softDelete' => static::usesSoftDelete() && config('scout.soft_delete', false),
        ]);
    }

        /**
     * Get the engine used to index the model.
     */
    public function searchableUsing(): Engine
    {
        return app(EngineManager::class)->engine($this->searchEngine);
    }

    public function setSearchEngine(string $engine) : self
    {
        $this->searchEngine = $engine;
        return $this;
    }

    public static function make(string $entity)
    {
        $customApp = new static();
        $customApp->setTable(self::PREFIX_TABLE . $entity);

        return $customApp;
    }
}
