<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use App\Models\Plan;
use App\Models\RenewalRequest;
use App\Models\Tenant;
use App\Services\InvoiceService;
use Illuminate\Console\Command;

class BackfillInvoicesCommand extends Command
{
    protected $signature = 'invoices:backfill {--dry-run}';

    protected $description = 'Create missing subscription invoices for approved tenants and approved renewals.';

    public function handle(InvoiceService $service): int
    {
        $dryRun = (bool) $this->option('dry-run');
        $this->info($dryRun ? 'Dry run — no rows will be inserted.' : 'Backfilling invoices…');

        $createdInitial = 0;
        $createdRenewal = 0;

        $tenants = Tenant::query()
            ->where('payment_status', 'approved')
            ->whereNotNull('plan_id')
            ->get();

        foreach ($tenants as $tenant) {
            $hasSubscription = Invoice::where('tenant_id', $tenant->id)
                ->where('type', 'subscription')
                ->exists();

            if (!$hasSubscription) {
                $plan = Plan::find($tenant->plan_id);
                if ($plan) {
                    $this->line("  + initial invoice for tenant #{$tenant->id} ({$tenant->name})");
                    if (!$dryRun) {
                        $service->createInitialInvoice($tenant, $plan);
                    }
                    $createdInitial++;
                }
            }
        }

        $renewals = RenewalRequest::query()
            ->where('status', 'approved')
            ->with('tenant')
            ->get();

        foreach ($renewals as $renewal) {
            if (!$renewal->tenant) continue;

            $alreadyInvoiced = Invoice::where('tenant_id', $renewal->tenant_id)
                ->where('notes_en', 'like', "%Renewal #{$renewal->id}%")
                ->exists();

            if ($alreadyInvoiced) continue;

            $plan = $renewal->plan_id ? Plan::find($renewal->plan_id) : $renewal->tenant->planModel;
            if (!$plan) continue;

            $this->line("  + renewal invoice for tenant #{$renewal->tenant_id} renewal #{$renewal->id}");
            if (!$dryRun) {
                $service->createRenewalInvoice($renewal->tenant, $renewal, $plan);
            }
            $createdRenewal++;
        }

        $this->info("Initial invoices created: {$createdInitial}");
        $this->info("Renewal invoices created: {$createdRenewal}");

        return self::SUCCESS;
    }
}
