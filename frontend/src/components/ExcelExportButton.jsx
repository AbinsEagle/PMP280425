import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * ExcelExportButton
 * 
 * Props:
 * - data: array of objects to export
 * - fileName: string filename for download (default: results.xlsx)
 */
export default function ExcelExportButton({ data = [], fileName = 'results.xlsx' }) {
  const handleExport = () => {
    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook and create Blob
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Trigger file download
    saveAs(blob, fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl transition duration-300"
    >
      <span role="img" aria-label="export to excel">📥</span> Export to Excel
    </button>
  );
}
