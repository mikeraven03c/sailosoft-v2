<?php

namespace Modules\Multitenancy\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Modules\Multitenancy\Tenant;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\TenantResource\RelationManagers;
use Modules\Multitenancy\Filament\Resources\TenantResource\Pages;

class TenantResource extends Resource
{
    protected static ?int $navigationSort = 1;
    protected static ?string $model = Tenant::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('id')->required()->label('id'),
                TextInput::make('name')->required()->label('name'),
                TextInput::make('email')->nullable(),
                TextInput::make('tenancy_db_name')
                    ->required()
                    ->label('Database'),
                TextInput::make('tenancy_db_username')
                    ->label('Database Username'),
                TextInput::make('tenancy_db_password')
                    ->password()
                    ->label('Database Passowrd'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id'),
                TextColumn::make('name'),
                TextColumn::make('tenancy_db_name'),
                TextColumn::make('domains.domain')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTenants::route('/'),
            'create' => Pages\CreateTenant::route('/create'),
            'edit' => Pages\EditTenant::route('/{record}/edit'),
        ];
    }
}
