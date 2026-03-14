<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenant = null;

        // 1. Try subdomain resolution
        $host = $request->getHost();
        $baseDomain = config('app.base_domain', 'hotel-automation-system.test');

        if (str_ends_with($host, '.' . $baseDomain)) {
            $subdomain = str_replace('.' . $baseDomain, '', $host);
            $tenant = Tenant::where('subdomain', $subdomain)->where('is_active', true)->first();
        }

        // 2. Try custom domain resolution
        if (!$tenant) {
            $tenant = Tenant::where('domain', $host)->where('is_active', true)->first();
        }

        // 3. Try from authenticated user's tenant
        if (!$tenant && $request->user() && $request->user()->tenant_id) {
            $tenant = Tenant::where('id', $request->user()->tenant_id)->where('is_active', true)->first();
        }

        if ($tenant) {
            // Check subscription is active
            if (!$tenant->isSubscriptionActive()) {
                abort(403, 'Subscription expired');
            }

            app()->instance('current_tenant', $tenant);
            app()->instance('current_tenant_id', $tenant->id);

            // Share tenant with Inertia views
            $request->attributes->set('tenant', $tenant);
        }

        return $next($request);
    }
}
