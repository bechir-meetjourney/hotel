import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useInitials } from '@/hooks/use-initials';
import { Search, Bell, Sun, Moon, Languages } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { useLocale } from '@/hooks/use-locale';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const { appearance, updateAppearance } = useAppearance();
    const { locale, toggleLocale } = useLocale();

    const toggleTheme = () => {
        updateAppearance(appearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="sticky top-0 z-30 mx-4 mt-3 flex h-14 items-center justify-between rounded-lg bg-card px-4 shadow-[0_0.1875rem_0.75rem_0_rgba(47,43,61,0.12)] dark:shadow-[0_0.1875rem_0.75rem_0_rgba(19,17,32,0.2)]">
            {/* Left side */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1">
                {/* Search */}
                <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Search className="h-[1.125rem] w-[1.125rem]" />
                </button>

                {/* Language Toggle */}
                <button
                    onClick={toggleLocale}
                    className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    title={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                >
                    <Languages className="h-[1.125rem] w-[1.125rem]" />
                    <span className="text-xs font-semibold">{locale === 'ar' ? 'EN' : 'ع'}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    {appearance === 'dark' ? <Sun className="h-[1.125rem] w-[1.125rem]" /> : <Moon className="h-[1.125rem] w-[1.125rem]" />}
                </button>

                {/* Notifications */}
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Bell className="h-[1.125rem] w-[1.125rem]" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ff4c51] ring-2 ring-card" />
                </button>

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="ms-2 flex items-center gap-2 rounded-full focus:outline-none">
                            <Avatar className="h-9 w-9 ring-2 ring-[#7367f0]/20">
                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                <AvatarFallback className="bg-[#7367f0] text-white text-xs font-semibold">
                                    {getInitials(auth.user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-lg" align="end" sideOffset={8}>
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
