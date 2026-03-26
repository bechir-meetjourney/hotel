import React from 'react';
import { FileSpreadsheet, FileText } from 'lucide-react';

interface Props {
    onExportExcel: () => void;
    onExportPdf: () => void;
}

export default function ExportButtons({ onExportExcel, onExportPdf }: Props) {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onExportExcel}
                className="inline-flex items-center gap-2 rounded-lg border border-[#28c76f] px-3 py-2 text-sm font-medium text-[#28c76f] hover:bg-[rgba(40,199,111,0.08)] transition-colors"
            >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
            </button>
            <button
                type="button"
                onClick={onExportPdf}
                className="inline-flex items-center gap-2 rounded-lg border border-[#ff4c51] px-3 py-2 text-sm font-medium text-[#ff4c51] hover:bg-[rgba(255,76,81,0.08)] transition-colors"
            >
                <FileText className="h-4 w-4" />
                PDF
            </button>
        </div>
    );
}
