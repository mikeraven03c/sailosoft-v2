<?php

namespace Modules\CustomEntity\Services;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Schema;
use Modules\CustomEntity\CustomEntity;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Collection;
use Modules\CustomEntity\CustomApp;
use Modules\CustomEntity\Data\Database\CustomAppFilterQueryData;

class CustomEntityDatabaseService
{
    const PREFIX_TABLE = CustomEntity::PREFIX_TABLE;

    public function __construct()
    {
    }

    public function buildSchema(CustomEntity $customEntity)
    {
        $entity = $customEntity->entityColumn();
        $table = $this->makeEntityName($entity);

        if (Schema::hasTable($table)) {
            throw new \Exception("Table $table is existing.");
        } else {
            $this->buildSchemaFromEntity($table);
        }
    }

    private function makeEntityName($entity)
    {
        return self::PREFIX_TABLE . $entity;
    }

    public function createCustomEntityTables()
    {
        $customEntities = CustomEntity::get();

        foreach ($customEntities as $customEntity) {
            $table = $customEntity->entityTable();

            if (!Schema::hasTable($table)) {
                $this->buildSchemaFromEntity($table);
            }
        }
    }

    public function dropCustomEntityTables(callable $hasTable = null)
    {
        $customEntities = CustomEntity::get();

        foreach ($customEntities as $customEntity) {
            $table = $customEntity->entityTable();

            if (Schema::hasTable($table)) {
                $hasTable && $hasTable($table);
                Schema::dropIfExists($table);
            }
        }
    }

    private function buildSchemaFromEntity($entity)
    {
        Schema::create($entity, function (Blueprint $table) {
            $table->id();
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    public function getModelByEntity(string $entity) : \Modules\CustomEntity\CustomApp
    {
        $customApp = new \Modules\CustomEntity\CustomApp;
        $customApp->setTable($entity);

        return $customApp;
    }

    public function getCustomEntityByNavigation(string $navigation) : CustomEntity
    {
        return CustomEntity::navigation($navigation)->firstOrFail();
    }

    public function getCustomAppQuery(Builder $query, $entity): Builder
    {
        $customApp = $query->getModel();
        $customApp->setTable($entity);

        $query->setModel($customApp);

        return $query;
    }

    public function store(CustomApp $customApp, array $filled): CustomApp
    {
        $customApp->fill($filled);
        $customApp->save();

        return $customApp;
    }

    public function delete(CustomApp $customApp, array $ids): bool
    {
        return $customApp->whereIn('id', $ids)->delete();
    }

    public function getPaginatedSearch(
        CustomApp $customApp,
        string $search = '',
        int $paginate = 10
    ) : \Illuminate\Pagination\LengthAwarePaginator
    {
        return $customApp->virtaulSearch($search)->latest()->paginate($paginate);
    }

    public function getSortedPagination(
        CustomApp $customApp,
        int $paginate,
        string $sortBy,
        string $sortMode,
    ): \Illuminate\Pagination\LengthAwarePaginator
    {
        $sortBy = $this->resolveDatabaseVirtualColumn($sortBy);

        return $customApp
            ->orderBy($sortBy, $sortMode)
            ->paginate($paginate);
    }

    public function getSortedPaginatedSearch(
        CustomApp $customApp,
        string $search,
        int $paginate,
        string $sortBy,
        string $sortMode,
    ) : \Illuminate\Pagination\LengthAwarePaginator
    {
        $sortBy = $this->resolveDatabaseVirtualColumn($sortBy);

        return $customApp->virtaulSearch($search)
            ->orderBy($sortBy, $sortMode)
            ->paginate($paginate);
    }

    public function isVirtualColumn($column) : bool
    {
        return !in_array($column, CustomApp::getCustomColumns());
    }

    public function resolveDatabaseVirtualColumn($column) : string
    {
        return $this->isVirtualColumn($column) ? "data->{$column}" : $column;
    }

    public function getDataByFilterQuery(
        CustomApp $customApp,
        CustomAppFilterQueryData $filter
    )  : \Illuminate\Contracts\Pagination\LengthAwarePaginator | \Illuminate\Database\Eloquent\Collection
    {
        $builder = $filter->search
            ? $customApp->virtualSearch($filter->search)
            : $customApp;

        // Sort
        if ($filter->sortBy) {
            $builder = $builder->orderBy(
                $this->resolveDatabaseVirtualColumn($filter->sortBy),
                $filter->sortMode
            );
        } else if ($filter->isLatest()) {
            $builder = $builder->latest();
        }

        // Filters
        if ($filter->filters && is_array($filter->filters)) {
            foreach ($filter->filters as $key => $filterValue) {
                $builder = $builder->where(
                    $this->resolveDatabaseVirtualColumn($key),
                    $filterValue
                );
            }
        }

        // Paginate || Get
        if ($filter->isPaginate()) {
           return $builder->paginate($filter->paginate);
        } else {
            return $builder->get();
        }
    }

    /**
     * @deprecated
     */
    public function getAllRecordsPaginatedSearch(
        CustomApp $customApp,
        string $search = '',
        int $paginate = 10
    ) : \Illuminate\Pagination\LengthAwarePaginator
    {
        return $customApp->virtaulSearch($search)->latest()->paginate(function($total) use ($paginate){
            if($paginate == 'all'){
                return $total;
            }
            return $paginate;
        });
    }
}
