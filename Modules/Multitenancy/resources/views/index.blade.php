@extends('multitenancy::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('multitenancy.name') !!}</p>
@endsection
