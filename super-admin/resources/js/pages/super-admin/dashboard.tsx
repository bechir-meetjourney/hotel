import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Building2, Users, CheckCircle, XCircle, Clock, ArrowUpRight, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useT } from '@/hooks/use-translations';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    template: string;
    plan: string;
    is_active: boolean;
    payment_status: string;
    created_at: string;
}

interface Props {
    stats: {
        total_tenants: number;
        active_tenants: number;
        inactive_tenants: number;
        total_users: number;
        pending_payments: number;
    };
    recent_tenants: Tenant[];
}

export default function SuperAdminDashboard({ stats, recent_tenants }: Props) {
    const { t } = useT();
    const flash = usePage().props.flash as { success?: string; error?: string } | undefined;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('super_admin'), href: '/super-admin' },
    ];

    const statCards = [
        {
            icon: Building2,
            label: t('total_tenants'),
            value: stats.total_tenants,
            bgClass: 'bg-[rgba(115,103,240,0.16)]',
            iconClass: 'text-[#7367f0]',
            borderClass: 'border-l-[#7367f0]',
        },
        {
            icon: CheckCircle,
            label: t('active'),
            value: stats.active_tenants,
            bgClass: 'bg-[rgba(40,199,111,0.16)]',
            iconClass: 'text-[#28c76f]',
            borderClass: 'border-l-[#28c76f]',
        },
        {
            icon: XCircle,
            label: t('inactive'),
            value: stats.inactive_tenants,
            bgClass: 'bg-[rgba(255,76,81,0.16)]',
            iconClass: 'text-[#ff4c51]',
            borderClass: 'border-l-[#ff4c51]',
        },
        {
            icon: Users,
            label: t('client_users'),
            value: stats.total_users,
            bgClass: 'bg-[rgba(0,186,209,0.16)]',
            iconClass: 'text-[#00bad1]',
            borderClass: 'border-l-[#00bad1]',
        },
        {
            icon: CreditCard,
            label: 'في انتظار الدفع',
            value: stats.pending_payments ?? 0,
            bgClass: 'bg-[rgba(255,159,67,0.16)]',
            iconClass: 'text-[#ff9f43]',
            borderClass: 'border-l-[#ff9f43]',
        },
    ];

    const paymentBadge = (status: string) => {
        switch (status) {
            case 'approved': return <span className="vuexy-badge vuexy-badge-success">مقبول</span>;
            case 'rejected': return <span className="vuexy-badge vuexy-badge-danger">مرفوض</span>;
            default: return <span className="vuexy-badge vuexy-badge-warning">قيد المراجعة</span>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('super_admin_dashboard')} />
            <div className="flex flex-col gap-6 p-6">
                {flash?.success && (
                    <div className="vuexy-card border-l-4 border-l-[#28c76f] px-4 py-3 text-sm text-[#28c76f]">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="vuexy-card border-l-4 border-l-[#ff4c51] px-4 py-3 text-sm text-[#ff4c51]">
                        {flash.error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {statCards.map((card, i) => (
                        <div key={i} className={`vuexy-card border-l-4 ${card.borderClass} flex items-center gap-4 p-5`}>
                            <div className={`rounded-lg p-3 ${card.bgClass}`}>
                                <card.icon className={`h-6 w-6 ${card.iconClass}`} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{card.label}</p>
                                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/super-admin/tenants/create" className="vuexy-card flex items-center gap-4 p-5 group cursor-pointer">
                        <div className="rounded-lg p-3 bg-[rgba(115,103,240,0.16)]">
                            <Building2 className="h-6 w-6 text-[#7367f0]" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{t('add_tenant')}</p>
                            <p className="text-sm text-muted-foreground">إنشاء منشأة جديدة</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#7367f0] transition-colors" />
                    </Link>

                    <Link href="/super-admin/tenants" className="vuexy-card flex items-center gap-4 p-5 group cursor-pointer">
                        <div className="rounded-lg p-3 bg-[rgba(0,186,209,0.16)]">
                            <Users className="h-6 w-6 text-[#00bad1]" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-foreground">{t('tenants')}</p>
                            <p className="text-sm text-muted-foreground">إدارة جميع المنشآت</p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-[#00bad1] transition-colors" />
                    </Link>
                </div>

                {/* Recent Tenants */}
                <div className="vuexy-card overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <h3 className="text-lg font-semibold text-foreground">{t('recent_tenants')}</h3>
                        <Button variant="link" asChild className="h-auto p-0 text-[#7367f0]">
                            <Link href="/super-admin/tenants">{t('view_all')}</Link>
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/50 text-muted-foreground">
                                    <th className="px-6 py-3 text-start font-medium">{t('name')}</th>
                                    <th className="px-6 py-3 text-start font-medium">{t('template')}</th>
                                    <th className="px-6 py-3 text-start font-medium">{t('plan')}</th>
                                    <th className="px-6 py-3 text-start font-medium">{t('status')}</th>
                                    <th className="px-6 py-3 text-start font-medium">الدفع</th>
                                    <th className="px-6 py-3 text-start font-medium">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_tenants.map((tenant) => (
                                    <tr key={tenant.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-3">
                                            <div className="font-medium text-foreground">{tenant.name}</div>
                                            <div className="text-xs text-muted-foreground">{tenant.slug}</div>
                                        </td>
                                        <td className="px-6 py-3 capitalize">{tenant.template}</td>
                                        <td className="px-6 py-3">
                                            <span className="vuexy-badge vuexy-badge-primary capitalize">{tenant.plan}</span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <Badge variant={tenant.is_active ? 'default' : 'destructive'} className="rounded-full">
                                                {tenant.is_active ? t('active') : t('inactive')}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-3">
                                            {paymentBadge(tenant.payment_status)}
                                        </td>
                                        <td className="px-6 py-3">
                                            <Button variant="ghost" size="sm" asChild className="text-[#7367f0] hover:text-[#7367f0]/80">
                                                <Link href={`/super-admin/tenants/${tenant.id}/edit`}>
                                                    {t('edit') || 'تعديل'}
                                                </Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {recent_tenants.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                            <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                                            {t('no_tenants_yet')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
