<?php

namespace Modules\CustomEntity\Filament\Resources;

use Filament\Forms;
use Filament\Tables;

use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Grid;
use Filament\Tables\Actions\Action;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\CustomEntityResource\RelationManagers;
use Illuminate\Support\Facades\Artisan;
use Modules\CustomEntity\Filament\Exports\CustomEntityExporter;
use Modules\CustomEntity\Filament\Imports\CustomEntityImporter;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource\Pages;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource\Actions\CreateTableFilamentAction;

class CustomEntityResource extends Resource
{
    protected static ?string $model = \Modules\CustomEntity\CustomEntity::class;

    // protected static ?string $breadcrumb = 'test';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        TextInput::make('entity')->prefix('entity_')->required()->autocomplete(false),
                        TextInput::make('name')->live(debounce: 500)->autocomplete(false)
                            ->afterStateUpdated(fn(Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug'),
                        TextInput::make('navigation')->required(),
                        TextInput::make('group'),
                        TextInput::make('priority')->numeric()->default(1),
                        Toggle::make('is_active')->default(true)
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('entity'),
                TextColumn::make('name'),
                TextColumn::make('slug'),
                TextColumn::make('navigation'),
                TextColumn::make('group'),
                TextColumn::make('is_active'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                \Filament\Tables\Actions\ExportAction::make()
                    ->exporter(CustomEntityExporter::class),
                // \Filament\Tables\Actions\ImportAction::make()
                //     ->importer(CustomEntityImporter::class)
                \Modules\CustomEntity\Filament\Imports\CustomEntityImportAction::make()
                    ->importer(CustomEntityImporter::class),
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('Update tenant:table')->action(function() {
                        $output = Artisan::call('tenants:run', [
                            'commandname' => 'module:seed',
                            '--argument' => [
                                'module=CustomEntity',
                            ],
                            '--option' => [
                                'class=CRMCustomEntitySeeder',
                            ],
                        ]);
                    }),
                ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Action::make('fields')
                    ->url(fn($record): string => route(
                        'filament.admin.resources.custom-entities.field',
                        ['record' => $record]
                    )),
                Action::make('display')
                    ->url(fn($record): string => route(
                        'filament.admin.resources.custom-entities.display',
                        ['record' => $record]
                    )),
                ActionGroup::make([
                    // Action::make('view')
                    CreateTableFilamentAction::make(''),
                    \Filament\Tables\Actions\ExportAction::make()
                        ->exporter(CustomEntityExporter::class),
                    // \Filament\Actions\ImportAction::make()
                    //     ->importer(CustomEntityImporter::class)
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    \Filament\Tables\Actions\ExportBulkAction::make()
                        ->exporter(CustomEntityExporter::class),
                    \Modules\CustomEntity\Filament\Resources\CustomEntityResource\Actions\CreateTableFilamentBulkAction::make()
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
            'index' => Pages\ListCustomEntities::route('/'),
            'create' => Pages\CreateCustomEntity::route('/create'),
            'edit' => Pages\EditCustomEntity::route('/{record}/edit'),
            'field' => Pages\CustomEditEntity::route('/{record}/field'),
            'display' => Pages\ManageColumnCustomEntity::route('/{record}/display'),
        ];
    }
}
