<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class HotelSetting extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'hotel_name_ar',
        'hotel_name_en',
        'description_ar',
        'description_en',
        'logo',
        'favicon',
        'star_rating',
        'currency',
        'timezone',
        'check_in_time',
        'check_out_time',
        'primary_color',
        'secondary_color',
        'meta_tags',
    ];

    protected function casts(): array
    {
        return [
            'primary_color' => 'array',
            'secondary_color' => 'array',
            'meta_tags' => 'array',
        ];
    }

    public function getHotelNameAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->hotel_name_ar : $this->hotel_name_en;
    }
}
