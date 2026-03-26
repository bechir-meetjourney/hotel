import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useT } from '@/hooks/use-translations';
import { useLocale } from '@/hooks/use-locale';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Building2, BarChart3, CreditCard, MessageSquare } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { t } = useT();
    const { isArabic } = useLocale();

    const superAdminNav: NavItem[] = [
        { title: t('dashboard'), href: '/super-admin', icon: LayoutGrid },
        { title: t('tenants'), href: '/super-admin/tenants', icon: Building2 },
    ];

    const reportsNav: NavItem[] = [
        { title: isArabic ? 'التقارير المالية' : 'Financial Reports', href: '/super-admin/reports/financial', icon: BarChart3 },
        { title: isArabic ? 'تقارير الاشتراكات' : 'Subscriptions', href: '/super-admin/reports/subscriptions', icon: CreditCard },
        { title: isArabic ? 'الرسائل والدعم' : 'Messages & Support', href: '/super-admin/reports/messages', icon: MessageSquare },
    ];

    return (
        <Sidebar collapsible="icon" variant="sidebar" side={isArabic ? 'right' : 'left'}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/super-admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={superAdminNav} label={t('menu')} />
                <NavMain items={reportsNav} label={isArabic ? 'التقارير' : 'Reports'} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
