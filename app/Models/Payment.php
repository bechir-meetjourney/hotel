<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'client_name',
        'amount',
        'payment_type',
        'discount',
        'status',
        'notes',
        'reference',
        'payment_date',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'discount' => 'decimal:2',
            'payment_date' => 'date',
            'due_date' => 'date',
        ];
    }
}
