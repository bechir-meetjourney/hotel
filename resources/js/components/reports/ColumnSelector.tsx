import React, { useState, useRef, useEffect } from 'react';
import { Columns3, Check } from 'lucide-react';

export interface ColumnDef {
    key: string;
    label: string;
    defaultVisible?: boolean;
}

interface Props {
    columns: ColumnDef[];
    visibleColumns: string[];
    onChange: (visible: string[]) => void;
    storageKey: string;
    label?: string;
}

export default function ColumnSelector({ columns, visibleColumns, onChange, storageKey, label }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggle = (key: string) => {
        const next = visibleColumns.includes(key)
            ? visibleColumns.filter(k => k !== key)
            : [...visibleColumns, key];
        onChange(next);
        localStorage.setItem(storageKey, JSON.stringify(next));
    };

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
                <Columns3 className="h-4 w-4" />
                {label || 'الأعمدة'}
            </button>
            {open && (
                <div className="absolute top-full mt-1 end-0 z-50 w-56 rounded-lg border border-border bg-card shadow-lg p-2 max-h-80 overflow-y-auto">
                    {columns.map(col => (
                        <button
                            key={col.key}
                            type="button"
                            onClick={() => toggle(col.key)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                            <div className={`flex h-4 w-4 items-center justify-center rounded border ${visibleColumns.includes(col.key) ? 'bg-primary border-primary' : 'border-input'}`}>
                                {visibleColumns.includes(col.key) && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span>{col.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
