<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('super-admin/dashboard', [
            'stats' => [
                'total_tenants' => Tenant::count(),
                'active_tenants' => Tenant::where('is_active', true)->count(),
                'inactive_tenants' => Tenant::where('is_active', false)->count(),
                'total_users' => User::where('role', 'client_admin')->count(),
                'pending_payments' => Tenant::where('payment_status', 'pending')->count(),
            ],
            'recent_tenants' => Tenant::latest()->take(5)->get(),
        ]);
    }
}
