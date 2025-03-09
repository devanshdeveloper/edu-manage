class ImportHelper {
  /**
   * Convert CSV string to JSON array
   * @param {string} csvString - CSV content as string
   * @param {Object} options - Optional configuration
   * @param {string} options.delimiter - CSV delimiter (default: ',')
   * @param {boolean} options.hasHeader - Whether CSV has header row (default: true)
   * @returns {Array<Object>} Array of objects representing CSV data
   */
  static csvToJSON(csvString, options = {}) {
    try {
      const { delimiter = ',', hasHeader = true } = options;
      
      // Split CSV into rows
      const rows = csvString.split(/\r?\n/).filter(row => row.trim());
      if (rows.length === 0) {
        throw new Error('CSV string is empty');
      }

      // Get headers
      const headers = hasHeader 
        ? this.parseCSVRow(rows[0], delimiter)
        : this.generateDefaultHeaders(this.parseCSVRow(rows[0], delimiter).length);

      // Convert rows to objects
      const dataRows = hasHeader ? rows.slice(1) : rows;
      return dataRows.map(row => {
        const values = this.parseCSVRow(row, delimiter);
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || '';
          return obj;
        }, {});
      });
    } catch (error) {
      console.error('Error converting CSV to JSON:', error);
      throw error;
    }
  }

  /**
   * Convert Excel file to JSON array
   * @param {File} file - Excel file object
   * @param {Object} options - Optional configuration
   * @param {string} options.sheet - Sheet name or index (default: 0)
   * @param {boolean} options.hasHeader - Whether sheet has header row (default: true)
   * @returns {Promise<Array<Object>>} Promise resolving to array of objects
   */
  static async excelToJSON(file, options = {}) {
    try {
      const { sheet = 0, hasHeader = true } = options;
      
      // Using XLSX library (needs to be included in the project dependencies)
      const XLSX = await import('xlsx');
      
      // Read the file
      const data = await this.readFileAsArrayBuffer(file);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Get the specified worksheet
      const sheetName = typeof sheet === 'number' 
        ? workbook.SheetNames[sheet]
        : sheet;
      const worksheet = workbook.Sheets[sheetName];
      
      if (!worksheet) {
        throw new Error(`Sheet ${sheet} not found in workbook`);
      }
      
      // Convert to JSON with headers
      return XLSX.utils.sheet_to_json(worksheet, {
        header: hasHeader ? undefined : 1,
        raw: false,
        defval: ''
      });
    } catch (error) {
      console.error('Error converting Excel to JSON:', error);
      throw error;
    }
  }

  /**
   * Parse a CSV row considering quoted values
   * @param {string} row - CSV row string
   * @param {string} delimiter - Delimiter character
   * @returns {Array<string>} Array of values
   * @private
   */
  static parseCSVRow(row, delimiter) {
    const values = [];
    let currentValue = '';
    let isQuoted = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        if (isQuoted && row[i + 1] === '"') {
          // Handle escaped quotes
          currentValue += '"';
          i++;
        } else {
          // Toggle quoted state
          isQuoted = !isQuoted;
        }
      } else if (char === delimiter && !isQuoted) {
        // End of value
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    values.push(currentValue); // Add the last value
    return values;
  }

  /**
   * Generate default headers for headerless CSV
   * @param {number} count - Number of columns
   * @returns {Array<string>} Array of header names
   * @private
   */
  static generateDefaultHeaders(count) {
    return Array.from({ length: count }, (_, i) => `Column${i + 1}`);
  }

  /**
   * Read file as ArrayBuffer
   * @param {File} file - File object to read
   * @returns {Promise<ArrayBuffer>} Promise resolving to ArrayBuffer
   * @private
   */
  static readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Detect file type from File object
   * @param {File} file - File object to check
   * @returns {string} File type ('csv', 'excel', or 'unknown')
   */
  static detectFileType(file) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv':
        return 'csv';
      case 'xls':
      case 'xlsx':
      case 'xlsm':
        return 'excel';
      default:
        return 'unknown';
    }
  }

  /**
   * Validate data structure consistency
   * @param {Array<Object>} data - Array of objects to validate
   * @returns {Object} Validation result with isValid and errors
   */
  static validateDataStructure(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return { isValid: false, errors: ['Data must be a non-empty array'] };
    }

    const errors = [];
    const firstRowKeys = Object.keys(data[0]);

    // Check if all rows have the same structure
    data.forEach((row, index) => {
      const rowKeys = Object.keys(row);
      if (rowKeys.length !== firstRowKeys.length) {
        errors.push(`Row ${index + 1} has different number of columns`);
      } else {
        const missingKeys = firstRowKeys.filter(key => !rowKeys.includes(key));
        if (missingKeys.length > 0) {
          errors.push(`Row ${index + 1} is missing columns: ${missingKeys.join(', ')}`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default ImportHelper;