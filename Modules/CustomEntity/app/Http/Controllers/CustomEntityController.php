<?php

namespace Modules\CustomEntity\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomEntityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('customentity::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('customentity::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        return response()->json();
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('customentity::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('customentity::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        return response();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
