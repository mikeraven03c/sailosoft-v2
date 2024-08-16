<?php

namespace Modules\CustomEntity\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Modules\CustomEntity\Filament\Resources\CustomAppResource;
use Modules\CustomEntity\Services\CustomEntityAppManagementService;
use Modules\CustomEntity\Services\CustomEntityRouteService;

class CustomAppController extends Controller
{
    public function __construct(
        public CustomEntityAppManagementService $appService,
        public CustomEntityRouteService $routeService
    )
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        return response()->json(
            $this->appService->fetchAppByFilterQuery($request)
        );

        // return response()->json(
        //     $search
        //         ? $this->appService->fetchAppWithSearchablePagination($search)
        //         : $this->appService->fetchAppWithPagination()
        // );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $navigation)
    {
        $process = $this->appService->processStoreCustomApp(
            $request,
            $navigation
        );

        if ($process instanceof \Illuminate\Contracts\Support\MessageBag) {
            return response()->json($process, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(
            $process,
            Response::HTTP_CREATED
        );
    }

    /**
     * Show the specified resource.
     */
    public function show($navigation, $id)
    {
        $customApp = $this->appService->findCustomApp($id);

        return response()->json($customApp);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $navigation, $id)
    {
        $process = $this->appService->processUpdateCustomApp(
            $request,
            $navigation,
            $id
        );

        if ($process instanceof \Illuminate\Contracts\Support\MessageBag) {
            return response()->json($process, Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json(
            $process,
            Response::HTTP_CREATED
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($navigation, $id)
    {
        $ids = explode(",", $id);

        $this->appService->processDeleteCustomApp($ids);

        return response()->json(['id' => $id]);
    }
}
