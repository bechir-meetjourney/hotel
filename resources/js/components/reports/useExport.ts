// Simple CSV/PDF export utilities
export function exportToExcel(data: Record<string, any>[], columns: { key: string; label: string }[], filename: string) {
    const visibleCols = columns;
    const header = visibleCols.map(c => c.label).join(',');
    const rows = data.map(row =>
        visibleCols.map(c => {
            const val = row[c.key] ?? '';
            return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',')
    );
    const csv = '\uFEFF' + [header, ...rows].join('\n'); // BOM for Arabic support
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

export function exportToPdf(data: Record<string, any>[], columns: { key: string; label: string }[], filename: string) {
    const visibleCols = columns;
    let html = `<!DOCTYPE html><html dir="rtl"><head><meta charset="utf-8"><title>${filename}</title>
    <style>body{font-family:Tahoma,Arial,sans-serif;direction:rtl;padding:20px}
    table{width:100%;border-collapse:collapse;margin-top:20px}
    th,td{border:1px solid #ddd;padding:8px 12px;text-align:right;font-size:13px}
    th{background:#7367f0;color:white}tr:nth-child(even){background:#f9f9f9}
    h1{color:#7367f0;font-size:20px}</style></head><body>
    <h1>${filename}</h1><table><thead><tr>`;
    visibleCols.forEach(c => html += `<th>${c.label}</th>`);
    html += '</tr></thead><tbody>';
    data.forEach(row => {
        html += '<tr>';
        visibleCols.forEach(c => html += `<td>${row[c.key] ?? ''}</td>`);
        html += '</tr>';
    });
    html += '</tbody></table></body></html>';
    const w = window.open('', '_blank');
    if (w) {
        w.document.write(html);
        w.document.close();
        setTimeout(() => { w.print(); }, 500);
    }
}
