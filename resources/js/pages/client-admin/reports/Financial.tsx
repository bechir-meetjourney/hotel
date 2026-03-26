import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { DollarSign, Clock, AlertTriangle, Percent, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '@/components/reports/StatCard';
import ColumnSelector, { type ColumnDef } from '@/components/reports/ColumnSelector';
import ExportButtons from '@/components/reports/ExportButtons';
import { exportToExcel, exportToPdf } from '@/components/reports/useExport';

interface Payment {
    id: number;
    client_name: string;
    amount: string;
    payment_type: string;
    discount: string;
    status: string;
    reference: string | null;
    payment_date: string | null;
    notes: string | null;
    created_at: string;
}

interface Props {
    payments: { data: Payment[]; links: any[]; current_page: number; last_page: number };
    stats: { total_collected: number; total_pending: number; total_overdue: number; total_discount: number; count: number };
    filters: Record<string, any>;
}

const ALL_COLUMNS: ColumnDef[] = [
    { key: 'id', label: '#', defaultVisible: true },
    { key: 'client_name', label: 'اسم العميل', defaultVisible: true },
    { key: 'payment_date', label: 'التاريخ', defaultVisible: true },
    { key: 'amount', label: 'المبلغ', defaultVisible: true },
    { key: 'payment_type', label: 'نوع الدفع', defaultVisible: true },
    { key: 'discount', label: 'الخصم', defaultVisible: true },
    { key: 'status', label: 'الحالة', defaultVisible: true },
    { key: 'reference', label: 'المرجع' },
    { key: 'notes', label: 'ملاحظات' },
];

const STORAGE_KEY = 'report-financial-columns';

const paymentTypeLabels: Record<string, string> = {
    cash: 'نقدي', bank_transfer: 'تحويل بنكي', card: 'بطاقة', online: 'إلكتروني',
};
const statusLabels: Record<string, string> = {
    paid: 'مدفوع', pending: 'قيد الانتظار', overdue: 'متأخر', refunded: 'مسترد',
};
const statusColors: Record<string, string> = {
    paid: 'vuexy-badge-success', pending: 'vuexy-badge-warning', overdue: 'vuexy-badge-danger', refunded: 'vuexy-badge-info',
};

export default function Financial({ payments, stats, filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'لوحة التحكم', href: '/client-admin' },
        { title: 'التقارير المالية', href: '/client-admin/reports/financial' },
    ];

    const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        return ALL_COLUMNS.filter(c => c.defaultVisible !== false).map(c => c.key);
    });

    const [search, setSearch] = useState(filters.search || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    const [paymentType, setPaymentType] = useState(filters.payment_type || '');
    const [hasDiscount, setHasDiscount] = useState(!!filters.has_discount);

    const applyFilters = () => {
        router.get('/client-admin/reports/financial', {
            search: search || undefined,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
            payment_type: paymentType || undefined,
            has_discount: hasDiscount ? '1' : undefined,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const dir = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/client-admin/reports/financial', { ...filters, sort: field, direction: dir }, { preserveState: true });
    };

    const visibleCols = ALL_COLUMNS.filter(c => visibleColumns.includes(c.key));

    const handleExportExcel = () => exportToExcel(payments.data, visibleCols, 'التقرير-المالي');
    const handleExportPdf = () => exportToPdf(payments.data, visibleCols, 'التقرير المالي');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="التقارير المالية" />
            <div className="flex flex-col gap-6 p-6">
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label="إجمالي المحصّل" value={`${Number(stats.total_collected).toLocaleString()} ر.س`} icon={DollarSign} color="success" />
                    <StatCard label="مبالغ معلّقة" value={`${Number(stats.total_pending).toLocaleString()} ر.س`} icon={Clock} color="warning" />
                    <StatCard label="مبالغ متأخرة" value={`${Number(stats.total_overdue).toLocaleString()} ر.س`} icon={AlertTriangle} color="danger" />
                    <StatCard label="إجمالي الخصومات" value={`${Number(stats.total_discount).toLocaleString()} ر.س`} icon={Percent} color="info" />
                </div>

                {/* Filters */}
                <div className="vuexy-card p-4">
                    <div className="flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-[200px]">
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">بحث</label>
                            <div className="relative">
                                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} placeholder="اسم العميل..." className="vuexy-input ps-9" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">من</label>
                            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="vuexy-input" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">إلى</label>
                            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="vuexy-input" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">نوع الدفع</label>
                            <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="vuexy-input">
                                <option value="">الكل</option>
                                <option value="cash">نقدي</option>
                                <option value="bank_transfer">تحويل بنكي</option>
                                <option value="card">بطاقة</option>
                                <option value="online">إلكتروني</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="hasDiscount" checked={hasDiscount} onChange={e => setHasDiscount(e.target.checked)} className="h-4 w-4 rounded" />
                            <label htmlFor="hasDiscount" className="text-sm">مع خصم فقط</label>
                        </div>
                        <button onClick={applyFilters} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                            تطبيق
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between">
                    <ExportButtons onExportExcel={handleExportExcel} onExportPdf={handleExportPdf} />
                    <ColumnSelector columns={ALL_COLUMNS} visibleColumns={visibleColumns} onChange={setVisibleColumns} storageKey={STORAGE_KEY} />
                </div>

                {/* Table */}
                <div className="vuexy-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground">
                                    {visibleCols.map(col => (
                                        <th key={col.key} className="px-4 py-3 text-start font-medium cursor-pointer hover:text-foreground" onClick={() => handleSort(col.key)}>
                                            {col.label}
                                            {filters.sort === col.key && <span className="ms-1">{filters.direction === 'asc' ? '↑' : '↓'}</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.data.map(p => (
                                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                                        {visibleCols.map(col => (
                                            <td key={col.key} className="px-4 py-3">
                                                {col.key === 'amount' ? `${Number(p.amount).toLocaleString()} ر.س` :
                                                 col.key === 'discount' ? (Number(p.discount) > 0 ? `${Number(p.discount).toLocaleString()} ر.س` : '—') :
                                                 col.key === 'payment_type' ? <span className="vuexy-badge vuexy-badge-info">{paymentTypeLabels[p.payment_type] || p.payment_type}</span> :
                                                 col.key === 'status' ? <span className={`vuexy-badge ${statusColors[p.status] || ''}`}>{statusLabels[p.status] || p.status}</span> :
                                                 col.key === 'payment_date' ? (p.payment_date || '—') :
                                                 (p as any)[col.key] ?? '—'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {payments.data.length === 0 && (
                                    <tr><td colSpan={visibleCols.length} className="px-4 py-12 text-center text-muted-foreground">لا توجد بيانات</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {payments.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {payments.links.map((link: any, i: number) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url, { preserveState: true })}
                                className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-white' : 'bg-card text-foreground border border-border hover:bg-muted'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
