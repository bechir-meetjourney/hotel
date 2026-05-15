<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = app('current_tenant_id');

        $invoices = Invoice::query()
            ->where('tenant_id', $tenantId)
            ->whereIn('status', ['sent', 'paid', 'overdue'])
            ->with('items')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('client-admin/invoices/index', [
            'invoices' => $invoices,
        ]);
    }

    public function downloadPdf(Invoice $invoice)
    {
        $tenantId = app('current_tenant_id');

        if ($invoice->tenant_id !== $tenantId) {
            abort(403);
        }

        $invoice->load('tenant', 'items');

        // Same resolution as super-admin: explicit override wins, but 'default'
        // is treated as "follow the global setting" so changes on the templates
        // page propagate to existing invoices.
        $override = $invoice->pdf_template;
        $globalDefault = \App\Models\SiteSetting::get('default_invoice_pdf_template', 'default');
        $template = ($override && $override !== 'default') ? $override : $globalDefault;
        $view = view()->exists("invoices.{$template}") ? "invoices.{$template}" : 'invoices.default';

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView($view, [
            'invoice' => $invoice,
            'settings' => \App\Models\InvoiceSetting::current(),
            'banks' => \App\Models\BankAccount::orderByDesc('is_default')->get(),
            'defaultTerms' => \App\Models\TermsTemplate::where('is_default', true)->first(),
            'logoUrl' => $this->absoluteLogoUrl(),
        ]);
        $pdf->setPaper('A4');

        return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
    }

    private function absoluteLogoUrl(): ?string
    {
        $path = \App\Models\SiteSetting::get('site_logo');
        if (!$path) return null;
        try {
            return \Illuminate\Support\Facades\Storage::disk('public')->url($path);
        } catch (\Throwable) {
            return null;
        }
    }

    public function updateTemplate(Request $request, Invoice $invoice)
    {
        $tenantId = app('current_tenant_id');

        if ($invoice->tenant_id !== $tenantId) {
            abort(403);
        }

        $validated = $request->validate([
            'pdf_template' => 'required|in:default,modern,classic',
        ]);

        $invoice->update(['pdf_template' => $validated['pdf_template']]);

        return back()->with('success', 'تم تحديث قالب الفاتورة');
    }

    public function uploadReceipt(Request $request, Invoice $invoice)
    {
        $tenantId = app('current_tenant_id');

        if ($invoice->tenant_id !== $tenantId) {
            abort(403);
        }

        if (!$invoice->requires_receipt) {
            return back()->with('error', 'لا يُطلب إيصال لهذه الفاتورة');
        }

        $request->validate([
            'receipt' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        $path = $request->file('receipt')->store('invoice-receipts', 'public');

        $invoice->update([
            'receipt_upload_path' => $path,
        ]);

        return back()->with('success', 'تم رفع الإيصال بنجاح');
    }
}
