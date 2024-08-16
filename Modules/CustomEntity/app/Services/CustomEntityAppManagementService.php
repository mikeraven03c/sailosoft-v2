<?php

namespace Modules\CustomEntity\Services;

use Illuminate\Contracts\Support\MessageBag;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Modules\CustomEntity\CustomApp;
use Illuminate\Support\Facades\Route;
use Modules\CustomEntity\CustomEntity;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\CustomEntity\Data\Database\CustomAppFilterQueryData;

class CustomEntityAppManagementService
{
    const PREFIX = CustomEntityDatabaseService::PREFIX_TABLE;

    const MESSAGE_BAG = MessageBag::class;

    public CustomEntity $customEntity;

    public string $tableName;

    public function __construct(
        public CustomEntityDatabaseService $databaseService,
        public CustomEntityFilamentFieldService $fieldService,
        public CustomEntityRouteService $routeService,
        public CustomEntityValidatorService $validatorService,
    ) {
    }

    public static function instance()
    {
        return app(self::class);
    }

    public static function instanceByParameterRecord()
    {
        $service = self::instance();
        $service->customEntity = $service->getCustomEntiyByParameterRecord();
        $service->tableName = $service->customEntity->entityTable();

        return $service;
    }

    public function getCustomEntity()
    {
        return $this->customEntity;
    }

    public function getTableName()
    {
        return $this->tableName;
    }

    public function getCustomApp(CustomEntity $customEntity): CustomApp
    {
        return $this->databaseService->getModelByEntity(
            $customEntity->entityTable() ?? $this->tableName
        );
    }

    public function getCustomEntiyByParameterRecord(): CustomEntity
    {
        return CustomEntity::navigation(
            $this->routeParameter()
        )->firstOrFail();
    }

    public function routeParameter($parameter = 'record'): string
    {
        return Route::current()->parameter($parameter);
    }

    public function getCustomAppQuery(
        Builder $query,
        CustomEntity|null $customEntity = null
    ): Builder {
        return $this->databaseService->getCustomAppQuery(
            $query,
            $customEntity?->entityTable() ?? $this->tableName
        );
    }

    public function publishCustomFields(CustomEntity $customEntity)
    {
        $columns = $customEntity->getCustomFields();

        return $this->fieldService->fields($columns);
    }

    public function publishDisplayCustomFields(CustomEntity $customEntity)
    {
        $columns = $customEntity->getDisplayCustomFields();

        return $this->fieldService->displayFields($columns);
    }

    public function getRouteParameterNavigation()
    {
        return $this->routeService->getNavigation();
    }

    public function getCustomAppModelByNavigation(): CustomApp
    {
        $navigation = $this->routeService->getNavigation();

        $customApp = $this->getCustomApp(
            $this->databaseService->getCustomEntityByNavigation($navigation)
        );

        return $customApp;
    }

    public function fetchAppWithPagination($paginate = 10): \Illuminate\Pagination\LengthAwarePaginator
    {
        $customApp = $this->getCustomAppModelByNavigation();

        $paginate = $this->routeService->getRequestPerPage($paginate);
        $sort = $this->routeService->getSort();

        if ($sort) {
            [$sortBy, $sortMode] = $this->resolveSortQueryParams($sort);

            return $this->databaseService->getSortedPagination(
                $customApp,
                $paginate,
                $sortBy,
                $sortMode
            );
        }

        return $customApp->latest()->paginate($paginate);
    }

    public function fetchAppWithSearchablePagination($search = ''): \Illuminate\Pagination\LengthAwarePaginator
    {
        $customApp = $this->getCustomAppModelByNavigation();

        $paginate = $this->routeService->getRequestPerPage(10);

        $sort = $this->routeService->getSort();

        if ($sort) {
            [$sortBy, $sortMode] = $this->resolveSortQueryParams($sort);

            return $this->databaseService->getSortedPaginatedSearch(
                $customApp,
                $search,
                $paginate,
                $sortBy,
                $sortMode
            );
        }

        return $this->databaseService->getPaginatedSearch(
            $customApp,
            $search,
            $paginate
        );
    }

    public function fetchAppByFilterQuery(Request $request): \Illuminate\Pagination\LengthAwarePaginator
    {
        $customApp = $this->getCustomAppModelByNavigation();

        $data = CustomAppFilterQueryData::fromRequest($request);

        return $this->databaseService->getDataByFilterQuery($customApp, $data);
    }

    public function findCustomApp(int $id) : CustomApp
    {
        $customApp = $this->getCustomAppModelByNavigation();

        $customApp = $customApp->findOrFail($id);

        return $customApp;
    }

    public function resolveSortQueryParams(string $sort): array
    {
        $isDescending = str_starts_with($sort, '-');

        if ($isDescending) {
            $sort = substr($sort, 1);
        }

        return [$sort, $isDescending ? 'desc' : 'asc'];
    }

    public function storeAppModelByNavigation(Request $request): CustomApp
    {
        $customApp = $this->getCustomAppModelByNavigation();

        $customApp = $this->databaseService->store($customApp, $request->all());

        return $customApp;
    }

    public function processStoreCustomApp(
        Request $request,
        string $navigation,
    ): MessageBag | CustomApp {
        $customEntity = $this->databaseService
            ->getCustomEntityByNavigation($navigation);
        $validator = $this->validatorService->validator($request, $customEntity);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $customApp = $this->getCustomApp($customEntity);

        $this->databaseService->store($customApp, $request->all());

        return $customApp;
    }

    public function processUpdateCustomApp(
        Request $request,
        string $navigation,
        int $id
    ): MessageBag | CustomApp {
        $customEntity = $this->databaseService
            ->getCustomEntityByNavigation($navigation);
        $validator = $this->validatorService->validator($request, $customEntity);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $customApp = $this->getCustomApp($customEntity);

        $customApp = $customApp->findOrFail($id);

        $this->databaseService->store($customApp, $request->all());

        return $customApp;
    }

    public function processDeleteCustomApp(
        array|int $ids,
        string $navigation = ''
    ) {
        $customApp = $this->getCustomAppModelByNavigation();

        $result = $this->databaseService->delete($customApp, $ids);

        return $result;
    }

    public function toResource($customApp): JsonResource
    {
        return new \Modules\CustomEntity\Http\Resources\CustomAppCollection($customApp);
    }




    // if ($validator->fails()) {
    //     return response()->json($validator->errors(), 422);
    // } else {
    //     return self::VALIDATION_NO_FAIL;
    // }
}
