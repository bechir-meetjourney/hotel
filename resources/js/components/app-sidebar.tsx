import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Building2,
    BedDouble,
    Image,
    FileText,
    ToggleRight,
    Phone,
    Settings,
    BookOpen,
    Folder,
} from 'lucide-react';
import AppLogo from './app-logo';

const superAdminNav: NavItem[] = [
    { title: 'Dashboard', href: '/super-admin', icon: LayoutGrid },
    { title: 'Tenants', href: '/super-admin/tenants', icon: Building2 },
];

const clientAdminNav: NavItem[] = [
    { title: 'Dashboard', href: '/client-admin', icon: LayoutGrid },
    { title: 'Rooms', href: '/client-admin/rooms', icon: BedDouble },
    { title: 'Gallery', href: '/client-admin/gallery', icon: Image },
    { title: 'Site Texts', href: '/client-admin/site-texts', icon: FileText },
    { title: 'Sections', href: '/client-admin/site-sections', icon: ToggleRight },
    { title: 'Contact', href: '/client-admin/contact-settings', icon: Phone },
    { title: 'Hotel Settings', href: '/client-admin/hotel-settings', icon: Settings },
];

const footerNavItems: NavItem[] = [
    { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { role?: string } | null } }>().props;
    const role = auth?.user?.role;

    const navItems = role === 'super_admin' ? superAdminNav : clientAdminNav;
    const dashboardHref = role === 'super_admin' ? '/super-admin' : '/client-admin';

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
