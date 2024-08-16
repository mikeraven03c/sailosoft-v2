@extends('vue::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('vue.name') !!}</p>
@endsection
