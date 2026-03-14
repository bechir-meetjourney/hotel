<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantSession
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->tenant_id) {
            abort(403, 'No tenant assigned');
        }

        $tenant = $user->tenant;
        if (!$tenant || !$tenant->is_active) {
            abort(403, 'Tenant inactive');
        }

        // Always set tenant context from authenticated user
        app()->instance('current_tenant', $tenant);
        app()->instance('current_tenant_id', $tenant->id);

        return $next($request);
    }
}
