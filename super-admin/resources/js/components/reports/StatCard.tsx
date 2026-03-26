import React from 'react';

interface Props {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string; // vuexy color class like 'primary', 'success', 'danger', 'warning', 'info'
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    primary: { bg: 'bg-[rgba(115,103,240,0.16)]', text: 'text-[#7367f0]', border: 'border-l-[#7367f0]' },
    success: { bg: 'bg-[rgba(40,199,111,0.16)]', text: 'text-[#28c76f]', border: 'border-l-[#28c76f]' },
    danger: { bg: 'bg-[rgba(255,76,81,0.16)]', text: 'text-[#ff4c51]', border: 'border-l-[#ff4c51]' },
    warning: { bg: 'bg-[rgba(255,159,67,0.16)]', text: 'text-[#ff9f43]', border: 'border-l-[#ff9f43]' },
    info: { bg: 'bg-[rgba(0,186,209,0.16)]', text: 'text-[#00bad1]', border: 'border-l-[#00bad1]' },
};

export default function StatCard({ label, value, icon: Icon, color }: Props) {
    const c = colorMap[color] || colorMap.primary;
    return (
        <div className={`vuexy-card border-l-4 ${c.border} flex items-center gap-4 p-5`}>
            <div className={`rounded-lg p-3 ${c.bg}`}>
                <Icon className={`h-6 w-6 ${c.text}`} />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
        </div>
    );
}
