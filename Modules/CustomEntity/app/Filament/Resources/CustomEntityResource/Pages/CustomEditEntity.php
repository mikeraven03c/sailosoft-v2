<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Pages;

use Livewire\Livewire;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Pages\Page;

use Illuminate\Support\Str;

use Filament\Actions\Action;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Builder;
use Modules\CustomEntity\CustomEntity;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource\Components;

class CustomEditEntity extends EditRecord
{
    protected static string $navigateIcon = 'heroicon-o-pencil-square';
    protected static string $resource = \Modules\CustomEntity\Filament\Resources\CustomEntityResource::class;

    public function form(Form $form): Form
    {
        return $form->schema([
            Builder::make(CustomEntity::PROPERTY_COLUMNS)
            ->blocks([
                Components\DefaultBlockColumn::make(),
                Components\SelectBlockColumn::make(),
            ])
        ]);
    }

    /**
     * @return array<int | string, string | Form>
     */
    protected function getForms(): array
    {
        return [
            'form' => $this->form(static::getResource()::form(
                $this->makeForm()
                    ->model($this->getRecord())
                    ->statePath($this->getFormStatePath())
                    ->columns($this->hasInlineLabels() ? 1 : 2)
                    ->inlineLabel($this->hasInlineLabels()),
            )),
        ];
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('edit')
                ->url('test'),
            Action::make('delete')
                ->requiresConfirmation()
                ->action(fn () => logger('test')),
        ];
    }
}
