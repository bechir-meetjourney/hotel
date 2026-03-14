<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class ContactSetting extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'whatsapp',
        'phone',
        'email',
        'address_ar',
        'address_en',
        'google_maps_url',
        'facebook',
        'instagram',
        'twitter',
        'tiktok',
        'snapchat',
    ];

    public function getAddressAttribute(): string
    {
        return app()->getLocale() === 'ar' ? ($this->address_ar ?? '') : ($this->address_en ?? '');
    }
}
