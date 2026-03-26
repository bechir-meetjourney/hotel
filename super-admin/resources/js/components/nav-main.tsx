import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [], label = 'القائمة' }: { items: NavItem[]; label?: string }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/50 font-semibold px-3 mb-1">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(item.href)}
                            tooltip={{ children: item.title }}
                            className="rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200 data-[active=true]:bg-[#7367f0] data-[active=true]:text-white data-[active=true]:shadow-[0_2px_6px_rgba(115,103,240,0.4)] hover:bg-sidebar-accent"
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className="size-5" />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
