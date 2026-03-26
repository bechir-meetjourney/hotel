import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { useT } from '@/hooks/use-translations';

export default function Appearance() {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('appearance'),
            href: '/settings/appearance',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('appearance')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('appearance')} description={t('appearance_desc')} />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
