import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useT } from '@/hooks/use-translations';
import { useLocale } from '@/hooks/use-locale';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    BedDouble,
    Image,
    FileText,
    ToggleRight,
    Phone,
    Settings,
    BarChart3,
    CreditCard,
    MessageSquare,
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { t } = useT();
    const { isArabic } = useLocale();

    const clientDashboard: NavItem[] = [
        { title: t('dashboard'), href: '/client-admin', icon: LayoutGrid },
    ];

    const clientManagement: NavItem[] = [
        { title: t('rooms'), href: '/client-admin/rooms', icon: BedDouble },
        { title: t('gallery'), href: '/client-admin/gallery', icon: Image },
        { title: t('site_texts'), href: '/client-admin/site-texts', icon: FileText },
        { title: t('sections'), href: '/client-admin/site-sections', icon: ToggleRight },
        { title: t('contact'), href: '/client-admin/contact-settings', icon: Phone },
        { title: t('hotel_settings'), href: '/client-admin/hotel-settings', icon: Settings },
    ];

    const clientReports: NavItem[] = [
        { title: isArabic ? 'تقرير الاشتراك' : 'Subscription', href: '/client-admin/reports/subscriptions', icon: CreditCard },
        { title: isArabic ? 'الرسائل والدعم' : 'Messages & Support', href: '/client-admin/reports/messages', icon: MessageSquare },
    ];

    return (
        <Sidebar collapsible="icon" variant="sidebar" side={isArabic ? 'right' : 'left'}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/client-admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={clientDashboard} label={t('main')} />
                <NavMain items={clientManagement} label={t('management')} />
                <NavMain items={clientReports} label={isArabic ? 'التقارير' : 'Reports'} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
