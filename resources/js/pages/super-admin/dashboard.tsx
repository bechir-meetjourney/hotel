import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Building2, Users, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    template: string;
    plan: string;
    is_active: boolean;
    created_at: string;
}

interface Props {
    stats: {
        total_tenants: number;
        active_tenants: number;
        inactive_tenants: number;
        total_users: number;
    };
    recent_tenants: Tenant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Super Admin', href: '/super-admin' },
];

export default function SuperAdminDashboard({ stats, recent_tenants }: Props) {
    const flash = usePage().props.flash as { success?: string; error?: string } | undefined;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <StatCard icon={Building2} label="Total Tenants" value={stats.total_tenants} color="blue" />
                    <StatCard icon={CheckCircle} label="Active" value={stats.active_tenants} color="green" />
                    <StatCard icon={XCircle} label="Inactive" value={stats.inactive_tenants} color="red" />
                    <StatCard icon={Users} label="Client Users" value={stats.total_users} color="purple" />
                </div>

                {/* Recent Tenants */}
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Recent Tenants</CardTitle>
                        <Button variant="link" asChild className="h-auto p-0">
                            <Link href="/super-admin/tenants">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-muted-foreground">
                                        <th className="px-4 py-3 text-start font-medium">Name</th>
                                        <th className="px-4 py-3 text-start font-medium">Template</th>
                                        <th className="px-4 py-3 text-start font-medium">Plan</th>
                                        <th className="px-4 py-3 text-start font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent_tenants.map((tenant) => (
                                        <tr key={tenant.id} className="border-b last:border-0">
                                            <td className="px-4 py-3 font-medium">{tenant.name}</td>
                                            <td className="px-4 py-3 capitalize">{tenant.template}</td>
                                            <td className="px-4 py-3 capitalize">{tenant.plan}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={tenant.is_active ? 'default' : 'destructive'} className="rounded-full">
                                                    {tenant.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                    {recent_tenants.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                                No tenants yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    };

    return (
        <Card className="py-4">
            <CardContent className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${colorMap[color]}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}
