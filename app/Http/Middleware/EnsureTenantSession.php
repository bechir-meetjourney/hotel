<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantSession
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->tenant_id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'email' => 'No hotel account is linked to this user.',
            ]);
        }

        $tenant = $user->tenant;
        if (!$tenant || !$tenant->is_active) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'email' => 'Your account is currently inactive. Please contact support.',
            ]);
        }

        // Always set tenant context from authenticated user
        app()->instance('current_tenant', $tenant);
        app()->instance('current_tenant_id', $tenant->id);

        return $next($request);
    }
}
