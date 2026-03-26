<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class SupportMessage extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'client_name',
        'client_email',
        'type',
        'subject',
        'message',
        'status',
        'assigned_to',
        'reply',
    ];
}
