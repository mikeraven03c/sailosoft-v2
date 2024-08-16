<?php

namespace Modules\CustomEntity\Filament\Pages;

use Filament\Pages\Page;
use Modules\CustomEntity\CustomEntity;

class CustomEntityAppPage extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'App Page';
    // return view('customentity::index');
    protected static string $view = 'customentity::custom_app';

    public $customEntities = [];

    public function mount()
    {
        $this->customEntities = CustomEntity::get();
    }
}
