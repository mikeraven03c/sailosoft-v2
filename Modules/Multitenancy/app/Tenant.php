<?php

namespace Modules\Multitenancy;

use Illuminate\Database\Eloquent\SoftDeletes;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    // public function getIncrementing()
    // {
    //     return true;
    // }

    // public function getTenantKeyName(): string
    // {
    //     return 'name';
    // }

    // public static function getCustomColumns(): array
    // {
    //     return [
    //         'id',
    //         'email',
    //         'name',
    //         'tenancy_db_name',
    //         'deleted_at',
    //         'created_by',
    //         'updated_by',
    //         'deleted_by',
    //         'restored_by'
    //     ];
    // }

    // public static function centalDomain($domain)
    // {
    //     return explode('|' , env('CENTRAL_DOMAIN', ''));
    // }

    // public static function bootHasUserStamp()
    // {
    //     static::creating(function ($model) {
    //         if (auth()->check()) {
    //             $model->created_by = auth()->user()->id;
    //             $model->updated_by = auth()->user()->id;
    //         }
    //     });

    //     static::updating(function ($model) {
    //         if (auth()->check()) {
    //             $model->updated_by = auth()->user()->id;
    //         }
    //     });

    //     static::deleting(function ($model) {
    //         if (auth()->check()) {
    //             $model->deleted_by = auth()->user()->id ?? null;
    //             $model->saveQuietly();

    //             if ($model->relationships) {
    //                 foreach ($model->relationships as $relationship) {
    //                     $model->$relationship()->each(function ($relation) {
    //                         $relation->delete();
    //                     });
    //                 }
    //             }
    //         }
    //     });

    //     static::restoring(function ($model) {
    //         if (auth()->check()) {
    //             $model->restored_by = auth()->user()->id ?? null;
    //             $model->saveQuietly();

    //             if ($model->relationships) {
    //                 foreach ($model->relationships as $relationship) {
    //                     $model->$relationship()->onlyTrashed()->restore();
    //                 }
    //             }
    //         }
    //     });
    // }
}
