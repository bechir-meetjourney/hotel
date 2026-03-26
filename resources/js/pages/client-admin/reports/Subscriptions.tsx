import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CreditCard, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import StatCard from '@/components/reports/StatCard';
import { useLocale } from '@/hooks/use-locale';

interface Props {
    subscription: {
        plan: string;
        starts_at: string | null;
        ends_at: string | null;
        is_active: boolean;
        payment_status: string;
        days_remaining: number | null;
    };
}

export default function Subscriptions({ subscription }: Props) {
    const { isArabic } = useLocale();
    const t = (ar: string, en: string) => isArabic ? ar : en;

    const planLabels: Record<string, string> = {
        starter: t('ضيافة انطلاقة', 'Diyafah Starter'),
        premium: t('ضيافة بريميوم', 'Diyafah Premium'),
        growth: t('ضيافة تطوير', 'Diyafah Growth'),
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('لوحة التحكم', 'Dashboard'), href: '/client-admin' },
        { title: t('تقرير الاشتراك', 'Subscription Report'), href: '/client-admin/reports/subscriptions' },
    ];

    const isExpiringSoon = subscription.days_remaining !== null && subscription.days_remaining > 0 && subscription.days_remaining <= 30;
    const isExpired = subscription.days_remaining !== null && subscription.days_remaining <= 0;

    const paymentLabel = subscription.payment_status === 'approved' ? t('مقبول', 'Approved')
        : subscription.payment_status === 'rejected' ? t('مرفوض', 'Rejected')
        : t('قيد المراجعة', 'Pending');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('تقرير الاشتراك', 'Subscription Report')} />
            <div className="flex flex-col gap-6 p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard label={t('الخطة الحالية', 'Current Plan')} value={planLabels[subscription.plan] || subscription.plan} icon={CreditCard} color="primary" />
                    <StatCard label={t('حالة الاشتراك', 'Status')} value={subscription.is_active ? t('نشط', 'Active') : t('غير نشط', 'Inactive')} icon={subscription.is_active ? CheckCircle : AlertTriangle} color={subscription.is_active ? 'success' : 'danger'} />
                    <StatCard label={t('حالة الدفع', 'Payment')} value={paymentLabel} icon={Clock} color={subscription.payment_status === 'approved' ? 'success' : subscription.payment_status === 'rejected' ? 'danger' : 'warning'} />
                    <StatCard label={t('الأيام المتبقية', 'Days Remaining')} value={subscription.days_remaining !== null ? Math.max(0, Math.floor(subscription.days_remaining)) : '—'} icon={Calendar} color={isExpired ? 'danger' : isExpiringSoon ? 'warning' : 'info'} />
                </div>

                <div className="vuexy-card p-6">
                    <h2 className="text-lg font-bold text-foreground mb-6">{t('تفاصيل الاشتراك', 'Subscription Details')}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Row label={t('الخطة', 'Plan')} value={planLabels[subscription.plan] || subscription.plan} />
                        <Row label={t('تاريخ البدء', 'Start Date')} value={subscription.starts_at || t('غير محدد', 'Not set')} />
                        <Row label={t('تاريخ الانتهاء', 'End Date')} value={subscription.ends_at || t('غير محدد', 'Not set')} />
                        <Row label={t('الحالة', 'Status')} value={<span className={`vuexy-badge ${subscription.is_active ? 'vuexy-badge-success' : 'vuexy-badge-danger'}`}>{subscription.is_active ? t('نشط', 'Active') : t('غير نشط', 'Inactive')}</span>} />
                        <Row label={t('حالة الدفع', 'Payment Status')} value={<span className={`vuexy-badge ${subscription.payment_status === 'approved' ? 'vuexy-badge-success' : subscription.payment_status === 'rejected' ? 'vuexy-badge-danger' : 'vuexy-badge-warning'}`}>{paymentLabel}</span>} />
                        <Row label={t('الأيام المتبقية', 'Days Remaining')} value={
                            subscription.days_remaining !== null ? (
                                <span className={isExpired ? 'text-[#ff4c51] font-bold' : isExpiringSoon ? 'text-[#ff9f43] font-bold' : ''}>
                                    {isExpired ? t('منتهي', 'Expired') : `${Math.floor(subscription.days_remaining)} ${t('يوم', 'days')}`}
                                </span>
                            ) : '—'
                        } />
                    </div>
                </div>

                {isExpiringSoon && !isExpired && (
                    <div className="vuexy-card border-l-4 border-l-[#ff9f43] p-4 flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-[#ff9f43] shrink-0" />
                        <div>
                            <p className="font-semibold text-foreground">{t('اشتراكك على وشك الانتهاء!', 'Your subscription is expiring soon!')}</p>
                            <p className="text-sm text-muted-foreground">{t(`متبقي ${Math.floor(subscription.days_remaining!)} يوم فقط. قم بتجديد اشتراكك.`, `Only ${Math.floor(subscription.days_remaining!)} days left. Please renew your subscription.`)}</p>
                        </div>
                    </div>
                )}
                {isExpired && (
                    <div className="vuexy-card border-l-4 border-l-[#ff4c51] p-4 flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-[#ff4c51] shrink-0" />
                        <div>
                            <p className="font-semibold text-foreground">{t('انتهى اشتراكك!', 'Your subscription has expired!')}</p>
                            <p className="text-sm text-muted-foreground">{t('يرجى تجديد الاشتراك لاستعادة الوصول الكامل.', 'Please renew to restore full access.')}</p>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}
