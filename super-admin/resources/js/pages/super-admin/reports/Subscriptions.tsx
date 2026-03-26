import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CheckCircle, Clock, AlertTriangle, Calendar, CreditCard, Search, Building2 } from 'lucide-react';
import { useState } from 'react';
import StatCard from '@/components/reports/StatCard';
import ColumnSelector, { type ColumnDef } from '@/components/reports/ColumnSelector';
import ExportButtons from '@/components/reports/ExportButtons';
import { exportToExcel, exportToPdf } from '@/components/reports/useExport';
import { useT } from '@/hooks/use-translations';
import { useLocale } from '@/hooks/use-locale';

interface Tenant {
    id: number; name: string; slug: string; plan: string; is_active: boolean;
    payment_status: string; subscription_starts_at: string | null;
    subscription_ends_at: string | null; days_remaining: number | null; created_at: string;
}

interface Props {
    tenants: { data: Tenant[]; links: any[]; current_page: number; last_page: number };
    stats: { total_active: number; total_pending: number; total_expired: number; expiring_soon: number; by_plan: Record<string, number> };
    filters: Record<string, any>;
}

const ALL_COLUMNS: ColumnDef[] = [
    { key: 'id', label: '#', defaultVisible: true },
    { key: 'name', label: 'المنشأة', defaultVisible: true },
    { key: 'plan', label: 'الخطة', defaultVisible: true },
    { key: 'subscription_starts_at', label: 'تاريخ البدء', defaultVisible: true },
    { key: 'subscription_ends_at', label: 'تاريخ الانتهاء', defaultVisible: true },
    { key: 'is_active', label: 'الحالة', defaultVisible: true },
    { key: 'days_remaining', label: 'الأيام المتبقية', defaultVisible: true },
    { key: 'slug', label: 'الرابط' },
];

const STORAGE_KEY = 'sa-report-subscriptions-columns';
const planLabelsAr: Record<string, string> = { starter: 'انطلاقة', premium: 'بريميوم', growth: 'تطوير' };
const planLabelsEn: Record<string, string> = { starter: 'Starter', premium: 'Premium', growth: 'Growth' };

export default function Subscriptions({ tenants, stats, filters }: Props) {
    const { t } = useT();
    const { isArabic } = useLocale();
    const l = (ar: string, en: string) => isArabic ? ar : en;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: l('الإدارة العليا', 'Super Admin'), href: '/super-admin' },
        { title: l('تقارير الاشتراكات', 'Subscriptions Report'), href: '/super-admin/reports/subscriptions' },
    ];

    const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
        return ALL_COLUMNS.filter(c => c.defaultVisible !== false).map(c => c.key);
    });

    const [search, setSearch] = useState(filters.search || '');
    const [plan, setPlan] = useState(filters.plan || '');
    const [status, setStatus] = useState(filters.status || '');

    const applyFilters = () => {
        router.get('/super-admin/reports/subscriptions', {
            search: search || undefined, plan: plan || undefined, status: status || undefined,
        }, { preserveState: true });
    };

    const handleSort = (field: string) => {
        const dir = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get('/super-admin/reports/subscriptions', { ...filters, sort: field, direction: dir }, { preserveState: true });
    };

    const visibleCols = ALL_COLUMNS.filter(c => visibleColumns.includes(c.key));
    const handleExportExcel = () => exportToExcel(tenants.data, visibleCols, 'تقرير-الاشتراكات');
    const handleExportPdf = () => exportToPdf(tenants.data, visibleCols, 'تقرير الاشتراكات');

    const getDaysClass = (days: number | null) => {
        if (days === null) return '';
        if (days <= 0) return 'text-[#ff4c51] font-bold';
        if (days <= 30) return 'text-[#ff9f43] font-bold';
        return '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="تقارير الاشتراكات" />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard label={l('اشتراكات نشطة', 'Active')} value={stats.total_active} icon={CheckCircle} color="success" />
                    <StatCard label={l('قيد المراجعة', 'Pending')} value={stats.total_pending} icon={Clock} color="warning" />
                    <StatCard label={l('منتهية', 'Expired')} value={stats.total_expired} icon={AlertTriangle} color="danger" />
                    <StatCard label={l('تنتهي قريباً', 'Expiring Soon')} value={stats.expiring_soon} icon={Calendar} color="warning" />
                    <StatCard label={l('بالخطط', 'By Plan')} value={`${stats.by_plan.starter || 0} / ${stats.by_plan.premium || 0} / ${stats.by_plan.growth || 0}`} icon={CreditCard} color="info" />
                </div>

                <div className="vuexy-card p-4">
                    <div className="flex flex-wrap items-end gap-3">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyFilters()} placeholder="بحث..." className="vuexy-input ps-9" />
                            </div>
                        </div>
                        <select value={plan} onChange={e => setPlan(e.target.value)} className="vuexy-input w-auto">
                            <option value="">كل الخطط</option>
                            <option value="starter">انطلاقة</option>
                            <option value="premium">بريميوم</option>
                            <option value="growth">تطوير</option>
                        </select>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="vuexy-input w-auto">
                            <option value="">كل الحالات</option>
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                        </select>
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
                                            {col.label}{filters.sort === col.key && <span className="ms-1">{filters.direction === 'asc' ? '↑' : '↓'}</span>}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tenants.data.map(tenant => (
                                    <tr key={tenant.id} className={`border-b border-border last:border-0 hover:bg-muted/30 ${tenant.days_remaining !== null && tenant.days_remaining <= 30 && tenant.days_remaining > 0 ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''} ${tenant.days_remaining !== null && tenant.days_remaining <= 0 ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                                        {visibleCols.map(col => (
                                            <td key={col.key} className="px-4 py-3">
                                                {col.key === 'plan' ? <span className="vuexy-badge vuexy-badge-primary">{(isArabic ? planLabelsAr : planLabelsEn)[tenant.plan] || tenant.plan}</span> :
                                                 col.key === 'is_active' ? <span className={`vuexy-badge ${tenant.is_active ? 'vuexy-badge-success' : 'vuexy-badge-danger'}`}>{tenant.is_active ? 'نشط' : 'غير نشط'}</span> :
                                                 col.key === 'days_remaining' ? (
                                                    <span className={getDaysClass(tenant.days_remaining)}>
                                                        {tenant.days_remaining === null ? '—' : tenant.days_remaining <= 0 ? 'منتهي' : `${Math.floor(tenant.days_remaining)} يوم`}
                                                        {tenant.days_remaining !== null && tenant.days_remaining <= 30 && tenant.days_remaining > 0 && <span className="ms-1 vuexy-badge vuexy-badge-warning text-[10px]">قريباً</span>}
                                                    </span>
                                                 ) :
                                                 col.key === 'subscription_starts_at' || col.key === 'subscription_ends_at' ? ((tenant as any)[col.key] ? new Date((tenant as any)[col.key]).toLocaleDateString('ar-SA') : '—') :
                                                 (tenant as any)[col.key] ?? '—'}
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
