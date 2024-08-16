<?php

namespace Modules\CustomEntity\Filament\Resources\CustomAppResource\Pages;

use Filament\Tables;
use Filament\Actions;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Modules\CustomEntity\CustomApp;
use Illuminate\Support\Facades\Route;
use Modules\CustomEntity\CustomEntity;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Model;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Support\Htmlable;
use Filament\Resources\Pages\ManageRecords;
use Modules\CustomEntity\Filament\Resources\CustomAppResource;
use Modules\CustomEntity\Services\CustomEntityAppManagementService;

class ManageCustomEntityApp extends ManageRecords
{
    protected static string $resource = CustomAppResource::class;

    public static ?string $title = 'Custom App';
    public CustomEntity $customEntity;
    public string $tableName;

    protected CustomEntityAppManagementService $appService;

    protected const APP_SERVICE = CustomEntityAppManagementService::class;

    protected function getHeaderActions(): array
    {
        // $action = Actions\CreateAction::make();
        return [
            $this->createModifiedAction()
        ];
    }

    public function getTitle(): string | Htmlable
    {
        return $this->customEntity->name;
    }

    public function form(Form $form): Form
    {
        $app = app(self::APP_SERVICE);
        $columns = $app->publishCustomFields($this->customEntity);
        return $form->schema([
            ...$columns
        ]);
    }

    public function mount(): void
    {

        parent::mount();

        $this->appService = CustomEntityAppManagementService::instanceByParameterRecord();
        $this->customEntity = $this->appService->getCustomEntity();
        $this->tableName = $this->appService->getTableName();
    }

    protected function configureCreateAction(Actions\CreateAction | Tables\Actions\CreateAction $action): void
    {
        parent::configureCreateAction($action);
    }


    public function table(Table $table): Table
    {
        $table = parent::table($table);
        $resource = static::getResource();
        $app = app(self::APP_SERVICE);
        return $table
            ->columns([
                ...$app->publishDisplayCustomFields($this->customEntity)
            ])
            ->actions([
                Tables\Actions\ViewAction::make()->recordTitle(fn($record) => $this->customEntity->name . ' ' . $record->id),
                Tables\Actions\EditAction::make()->authorize(
                        fn (Model $record): bool => $resource::canEdit($record)
                    )->recordTitle(fn($record) => $this->customEntity->name . ' ' . $record->id)
                    ->form(fn (Form $form): Form => $this->form($form->columns(2))),
                Tables\Actions\DeleteAction::make(),
            ])
            ->modifyQueryUsing(function (Builder $query) use ($app) {
                $query = $app->getCustomAppQuery($query, $this->customEntity);

                return $query;
            });
    }

    public function createModifiedAction()
    {
        $action = Actions\CreateAction::make();

        return $action
            ->modelLabel($this->customEntity->name)
            ->form(fn (Form $form): Form => $this->form($form->columns(2)))
            ->action(function (array $arguments, Form $form) use ($action): void {
                $model = $this->getModel();

                $record = $action->process(function (
                    array $data,
                    \Filament\Actions\Contracts\HasActions $livewire
                ) use ($model, $action): Model {
                    if ($translatableContentDriver = $livewire->makeFilamentTranslatableContentDriver()) {
                        $record = $translatableContentDriver->makeRecord($model, $data);
                    } else {
                        $app = app(self::APP_SERVICE);

                        $record = $app->getCustomApp($this->customEntity);

                        $record->fill($data);
                    }

                    if ($relationship = $action->getRelationship()) {
                        /** @phpstan-ignore-next-line */
                        $relationship->save($record);

                        return $record;
                    }

                    $record->save();

                    return $record;
                });

                $action->record($record);
                $form->model($record)->saveRelationships();

                if ($arguments['another'] ?? false) {
                    $action->callAfter();
                    $action->sendSuccessNotification();

                    $action->record(null);

                    // Ensure that the form record is anonymized so that relationships aren't loaded.
                    $form->model($model);

                    $form->fill();

                    $this->halt();

                    return;
                }

                $action->success();
            });
    }
}
