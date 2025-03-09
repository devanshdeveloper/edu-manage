class ExportHelper {
  /**
   * Export data as PDF by opening in a new tab and triggering print
   * @param {string} content - HTML content to print
   * @param {string} title - Title for the PDF document
   */
  static exportAsPDF(content, title = 'Export') {
    try {
      // Create a new window/tab
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Unable to open print window. Please check if pop-ups are blocked.');
      }

      // Write the content to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for content to load before printing
      printWindow.onload = () => {
        printWindow.print();
        // Close the window after print dialog is closed (optional)
        printWindow.onafterprint = () => printWindow.close();
      };
    } catch (error) {
      console.error('Error exporting as PDF:', error);
      throw error;
    }
  }

  /**
   * Export data as Excel file
   * @param {Array<Object>} data - Array of objects to export
   * @param {string} filename - Name of the file to download
   * @param {string} sheetName - Name of the worksheet
   */
  static async exportAsExcel(data, filename = 'export.xlsx', sheetName = 'Sheet1') {
    try {
      // Using XLSX library (needs to be included in the project dependencies)
      const XLSX = await import('xlsx');
      
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Convert data to worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error exporting as Excel:', error);
      throw error;
    }
  }

  /**
   * Helper method to download a Blob as a file
   * @param {Blob} blob - The Blob to download
   * @param {string} filename - Name of the file to download
   * @private
   */
  static downloadByBlob(blob, filename) {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  }

  /**
   * Export data as CSV file
   * @param {Array<Object>} data - Array of objects to export
   * @param {string} filename - Name of the file to download
   */
  static exportAsCSV(data, filename = 'export.csv') {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data must be a non-empty array');
      }

      // Get headers from the first object
      const headers = Object.keys(data[0]);
      
      // Convert data to CSV format
      const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => 
          headers.map(header => {
            let cell = row[header];
            // Handle special characters and commas
            if (cell === null || cell === undefined) cell = '';
            cell = cell.toString();
            if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
              cell = `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          }).join(',')
        )
      ].join('\n');

      // Create blob and download using helper
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      this.downloadByBlob(blob, filename);
    } catch (error) {
      console.error('Error exporting as CSV:', error);
      throw error;
    }
  }
}

export default ExportHelper;