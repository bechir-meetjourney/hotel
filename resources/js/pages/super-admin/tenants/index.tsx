import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    domain: string | null;
    subdomain: string | null;
    template: string;
    plan: string;
    is_active: boolean;
    subscription_starts_at: string | null;
    subscription_ends_at: string | null;
    users_count: number;
    created_at: string;
}

interface PaginatedData {
    data: Tenant[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface Props {
    tenants: PaginatedData;
    filters: { search?: string; status?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Super Admin', href: '/super-admin' },
    { title: 'Tenants', href: '/super-admin/tenants' },
];

export default function TenantsIndex({ tenants, filters }: Props) {
    const flash = usePage().props.flash as { success?: string; error?: string } | undefined;

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.get('/super-admin/tenants', {
            search: formData.get('search') as string,
            status: filters.status,
        }, { preserveState: true });
    }

    function handleToggle(tenantId: number) {
        if (confirm('Are you sure you want to toggle this tenant\'s status?')) {
            router.post(`/super-admin/tenants/${tenantId}/toggle`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Tenants" />
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

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">Tenants</h1>
                    <Button asChild>
                        <Link href="/super-admin/tenants/create">
                            <Plus className="h-4 w-4" />
                            Add Tenant
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <form onSubmit={handleSearch} className="flex-1">
                        <Input
                            name="search"
                            type="text"
                            placeholder="Search tenants..."
                            defaultValue={filters.search || ''}
                        />
                    </form>
                    <Select
                        value={filters.status || 'all'}
                        onValueChange={(value) =>
                            router.get('/super-admin/tenants', { ...filters, status: value === 'all' ? undefined : value }, { preserveState: true })
                        }
                    >
                        <SelectTrigger className="w-full sm:w-[160px]">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <Card className="py-0">
                    <CardContent className="overflow-x-auto p-0">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-muted-foreground">
                                    <th className="px-4 py-3 text-start font-medium">Name</th>
                                    <th className="px-4 py-3 text-start font-medium">Domain</th>
                                    <th className="px-4 py-3 text-start font-medium">Template</th>
                                    <th className="px-4 py-3 text-start font-medium">Plan</th>
                                    <th className="px-4 py-3 text-start font-medium">Users</th>
                                    <th className="px-4 py-3 text-start font-medium">Subscription</th>
                                    <th className="px-4 py-3 text-start font-medium">Status</th>
                                    <th className="px-4 py-3 text-start font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tenants.data.map((tenant) => (
                                    <tr key={tenant.id} className="border-b last:border-0 hover:bg-muted/30">
                                        <td className="px-4 py-3">
                                            <div className="font-medium">{tenant.name}</div>
                                            <div className="text-xs text-muted-foreground">{tenant.slug}</div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {tenant.subdomain ? `${tenant.subdomain}.*` : tenant.domain || '—'}
                                        </td>
                                        <td className="px-4 py-3 capitalize">{tenant.template}</td>
                                        <td className="px-4 py-3 capitalize">{tenant.plan}</td>
                                        <td className="px-4 py-3">{tenant.users_count}</td>
                                        <td className="px-4 py-3 text-xs">
                                            {tenant.subscription_ends_at ? (
                                                <span>{tenant.subscription_starts_at} → {tenant.subscription_ends_at}</span>
                                            ) : '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={tenant.is_active ? 'default' : 'destructive'} className="rounded-full">
                                                {tenant.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/super-admin/tenants/${tenant.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleToggle(tenant.id)}
                                                    className={tenant.is_active ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'}
                                                >
                                                    <Power className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tenants.data.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                                            No tenants found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {tenants.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {tenants.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'ghost'}
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                                className={!link.url ? 'cursor-not-allowed opacity-50' : ''}
                            >
                                {link.url ? (
                                    <Link href={link.url} preserveState dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
