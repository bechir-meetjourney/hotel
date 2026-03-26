import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CheckCircle, Clock, XCircle, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import StatCard from '@/components/reports/StatCard';
import ColumnSelector, { type ColumnDef } from '@/components/reports/ColumnSelector';
import ExportButtons from '@/components/reports/ExportButtons';
import { exportToExcel, exportToPdf } from '@/components/reports/useExport';
import { useT } from '@/hooks/use-translations';

interface Tenant {
    id: number; name: string; slug: string; plan: string; email: string | null;
    payment_status: string; payment_method: string; is_active: boolean;
    created_at: string; subscription_starts_at: string | null; subscription_ends_at: string | null;
}

interface Props {
    tenants: { data: Tenant[]; links: any[]; current_page: number; last_page: number };
    stats: { total_approved: number; total_pending: number; total_rejected: number };
    filters: Record<string, any>;
}

const ALL_COLUMNS: ColumnDef[] = [
    { key: 'id', label: '#', defaultVisible: true },
    { key: 'name', label: 'المنشأة', defaultVisible: true },
    { key: 'plan', label: 'الخطة', defaultVisible: true },
    { key: 'payment_status', label: 'حالة الدفع', defaultVisible: true },
    { key: 'payment_method', label: 'طريقة الدفع', defaultVisible: true },
    { key: 'is_active', label: 'الحالة', defaultVisible: true },
    { key: 'created_at', label: 'تاريخ التسجيل', defaultVisible: true },
    { key: 'email', label: 'البريد' },
    { key: 'slug', label: 'الرابط' },
];

const STORAGE_KEY = 'sa-report-financial-columns';

const paymentStatusLabels: Record<string, string> = { approved: 'مقبول', pending: 'قيد المراجعة', rejected: 'مرفوض' };
const paymentStatusColors: Record<string, string> = { approved: 'vuexy-badge-success', pending: 'vuexy-badge-warning', rejected: 'vuexy-badge-danger' };

export default function Financial({ tenants, stats, filters }: Props) {
    const { t } = useT();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('super_admin'), href: '/super-admin' },
        { title: 'التقارير المالية', href: '/super-admin/reports/financial' },
    ];

    const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        return ALL_COLUMNS.filter(c => c.defaultVisible !== false).map(c => c.key);
    });

    const [search, setSearch] = useState(filters.search || '');
    const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || '');

    const applyFilters = () => {
        router.get('/super-admin/reports/financial', {
            search: search || undefined,
            payment_status: paymentStatus || undefined,
            date_from: filters.date_from,
            date_to: filters.date_to,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const dir = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/super-admin/reports/financial', { ...filters, sort: field, direction: dir }, { preserveState: true });
    };

    const visibleCols = ALL_COLUMNS.filter(c => visibleColumns.includes(c.key));
    const handleExportExcel = () => exportToExcel(tenants.data, visibleCols, 'التقرير-المالي');
    const handleExportPdf = () => exportToPdf(tenants.data, visibleCols, 'التقرير المالي');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="التقارير المالية" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                    <StatCard label="دفعات مقبولة" value={stats.total_approved} icon={CheckCircle} color="success" />
                    <StatCard label="قيد المراجعة" value={stats.total_pending} icon={Clock} color="warning" />
                    <StatCard label="مرفوضة" value={stats.total_rejected} icon={XCircle} color="danger" />
                </div>

                <div className="vuexy-card p-4">
                    <div className="flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} placeholder="بحث بالاسم..." className="vuexy-input ps-9" />
                            </div>
                        </div>
                        <div>
                            <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="vuexy-input">
                                <option value="">كل الحالات</option>
                                <option value="approved">مقبول</option>
                                <option value="pending">قيد المراجعة</option>
                                <option value="rejected">مرفوض</option>
                            </select>
                        </div>
                        <button onClick={applyFilters} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">تطبيق</button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <ExportButtons onExportExcel={handleExportExcel} onExportPdf={handleExportPdf} />
                    <ColumnSelector columns={ALL_COLUMNS} visibleColumns={visibleColumns} onChange={setVisibleColumns} storageKey={STORAGE_KEY} />
                </div>

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
                                {tenants.data.map(t => (
                                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                                        {visibleCols.map(col => (
                                            <td key={col.key} className="px-4 py-3">
                                                {col.key === 'payment_status' ? <span className={`vuexy-badge ${paymentStatusColors[t.payment_status] || ''}`}>{paymentStatusLabels[t.payment_status] || t.payment_status}</span> :
                                                 col.key === 'is_active' ? <span className={`vuexy-badge ${t.is_active ? 'vuexy-badge-success' : 'vuexy-badge-danger'}`}>{t.is_active ? 'نشط' : 'غير نشط'}</span> :
                                                 col.key === 'plan' ? <span className="vuexy-badge vuexy-badge-primary capitalize">{t.plan}</span> :
                                                 col.key === 'created_at' ? new Date(t.created_at).toLocaleDateString('ar-SA') :
                                                 (t as any)[col.key] ?? '—'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {tenants.data.length === 0 && (
                                    <tr><td colSpan={visibleCols.length} className="px-4 py-12 text-center text-muted-foreground">
                                        <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />لا توجد بيانات
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {tenants.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {tenants.links.map((link: any, i: number) => (
                            <button key={i} disabled={!link.url} onClick={() => link.url && router.visit(link.url, { preserveState: true })}
                                className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-primary text-white' : 'bg-card text-foreground border border-border hover:bg-muted'} ${!link.url ? 'opacity-50' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
