<?php

namespace Modules\Vue\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class VueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('vue::app');
        return view('vue::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('vue::index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        return new RedirectResponse('test');
        //
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('vue::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('vue::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        return new RedirectResponse('test');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
