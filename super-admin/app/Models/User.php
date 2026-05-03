<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'photo',
        'password',
        'tenant_id',
        'role',
        'role_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function roleModel(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isClientAdmin(): bool
    {
        return $this->role === 'client_admin';
    }

    /**
     * Super-admins implicitly have every permission.
     * Staff need a role that grants the requested key.
     * Cached per request via memoization on the loaded role.
     */
    public function hasPermission(string $key): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        if (!$this->role_id) {
            return false;
        }

        $cacheKey = "user.{$this->id}.permissions";
        $keys = cache()->remember($cacheKey, 300, function () {
            return $this->roleModel
                ? $this->roleModel->permissions()->pluck('key')->all()
                : [];
        });

        return in_array($key, $keys, true);
    }

    public function permissionKeys(): array
    {
        if ($this->isSuperAdmin()) {
            return ['*'];
        }
        if (!$this->role_id) {
            return [];
        }
        return $this->roleModel
            ? $this->roleModel->permissions()->pluck('key')->all()
            : [];
    }
}
