import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Super Admin', href: '/super-admin' },
    { title: 'Tenants', href: '/super-admin/tenants' },
    { title: 'Create', href: '/super-admin/tenants/create' },
];

export default function CreateTenant() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        domain: '',
        subdomain: '',
        template: 'madina',
        email: '',
        phone: '',
        plan: 'basic',
        subscription_starts_at: '',
        subscription_ends_at: '',
        is_active: true,
        admin_name: '',
        admin_email: '',
        admin_password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/super-admin/tenants');
    }

    function autoSlug(name: string) {
        setData('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tenant" />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Create New Tenant</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tenant Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Name" error={errors.name}>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => { setData('name', e.target.value); autoSlug(e.target.value); }}
                                        required
                                    />
                                </Field>
                                <Field label="Slug" error={errors.slug}>
                                    <Input
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                    />
                                </Field>
                                <Field label="Domain (optional)" error={errors.domain}>
                                    <Input
                                        value={data.domain}
                                        onChange={(e) => setData('domain', e.target.value)}
                                        placeholder="hotel.example.com"
                                    />
                                </Field>
                                <Field label="Subdomain (optional)" error={errors.subdomain}>
                                    <Input
                                        value={data.subdomain}
                                        onChange={(e) => setData('subdomain', e.target.value)}
                                        placeholder="grand"
                                    />
                                </Field>
                                <Field label="Email" error={errors.email}>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </Field>
                                <Field label="Phone" error={errors.phone}>
                                    <Input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </Field>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Template & Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Template" error={errors.template}>
                                    <Select value={data.template} onValueChange={(value) => setData('template', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="madina">Madina</SelectItem>
                                            <SelectItem value="riyadh">Riyadh</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field label="Plan" error={errors.plan}>
                                    <Select value={data.plan} onValueChange={(value) => setData('plan', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="basic">Basic</SelectItem>
                                            <SelectItem value="professional">Professional</SelectItem>
                                            <SelectItem value="enterprise">Enterprise</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                                <Field label="Subscription Start" error={errors.subscription_starts_at}>
                                    <Input
                                        type="date"
                                        value={data.subscription_starts_at}
                                        onChange={(e) => setData('subscription_starts_at', e.target.value)}
                                    />
                                </Field>
                                <Field label="Subscription End" error={errors.subscription_ends_at}>
                                    <Input
                                        type="date"
                                        value={data.subscription_ends_at}
                                        onChange={(e) => setData('subscription_ends_at', e.target.value)}
                                    />
                                </Field>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked === true)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Admin User</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Admin Name" error={errors.admin_name}>
                                    <Input
                                        value={data.admin_name}
                                        onChange={(e) => setData('admin_name', e.target.value)}
                                        required
                                    />
                                </Field>
                                <Field label="Admin Email" error={errors.admin_email}>
                                    <Input
                                        type="email"
                                        value={data.admin_email}
                                        onChange={(e) => setData('admin_email', e.target.value)}
                                        required
                                    />
                                </Field>
                                <Field label="Admin Password" error={errors.admin_password}>
                                    <Input
                                        type="password"
                                        value={data.admin_password}
                                        onChange={(e) => setData('admin_password', e.target.value)}
                                        required
                                        minLength={8}
                                    />
                                </Field>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" asChild>
                            <Link href="/super-admin/tenants">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Tenant'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <Label>{label}</Label>
            {children}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
