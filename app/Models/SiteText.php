<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class SiteText extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'section',
        'key',
        'value_ar',
        'value_en',
    ];

    public function getValueAttribute(): string
    {
        return app()->getLocale() === 'ar' ? ($this->value_ar ?? '') : ($this->value_en ?? '');
    }
}
