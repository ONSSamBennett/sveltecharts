/**
 * Format utility functions for numbers, dates, and other values
 */

/**
 * Format a number with thousands separator and decimal places
 * @param {number} value - Value to format
 * @param {Object} options - Format options
 * @param {number} options.decimals - Number of decimal places (default: 0)
 * @param {string} options.separator - Thousands separator (default: ',')
 * @returns {string} Formatted number
 */
export function formatNumber(value, options = {}) {
  const { decimals = 0, separator = ',' } = options;

  if (value === null || value === undefined) return 'N/A';
  if (typeof value !== 'number') return String(value);

  const fixed = value.toFixed(decimals);
  const parts = fixed.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

/**
 * Format a number as percentage
 * @param {number} value - Value between 0 and 1 (or 0-100 if isPercentage is true)
 * @param {Object} options - Format options
 * @param {number} options.decimals - Number of decimal places (default: 1)
 * @param {boolean} options.isPercentage - If value is already 0-100 (default: false)
 * @returns {string} Formatted percentage (e.g., '42.5%')
 */
export function formatPercent(value, options = {}) {
  const { decimals = 1, isPercentage = false } = options;

  if (value === null || value === undefined) return 'N/A';

  const percentValue = isPercentage ? value : value * 100;
  return `${percentValue.toFixed(decimals)}%`;
}

/**
 * Format a number as currency
 * @param {number} value - Value to format
 * @param {Object} options - Format options
 * @param {string} options.currency - Currency code (default: 'GBP')
 * @param {number} options.decimals - Number of decimal places (default: 0)
 * @param {string} options.locale - Locale string (default: 'en-GB')
 * @returns {string} Formatted currency (e.g., '£1,234.50')
 */
export function formatCurrency(value, options = {}) {
  const { currency = 'GBP', decimals = 0, locale = 'en-GB' } = options;

  if (value === null || value === undefined) return 'N/A';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch (e) {
    return `${value}`;
  }
}

/**
 * Format a date
 * @param {Date|string} date - Date to format
 * @param {Object} options - Format options
 * @param {string} options.format - Format string (default: 'short')
 * @param {string} options.locale - Locale string (default: 'en-GB')
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  const { format = 'short', locale = 'en-GB' } = options;

  if (!date) return 'N/A';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return 'Invalid Date';

  const formatOptions = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    month: { year: 'numeric', month: 'long' },
    year: { year: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    'date-time': {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  const opts = formatOptions[format] || formatOptions.short;

  try {
    return new Intl.DateTimeFormat(locale, opts).format(d);
  } catch (e) {
    return d.toString();
  }
}

/**
 * Format a large number with abbreviation (e.g., 1.2M, 5K)
 * @param {number} value - Value to format
 * @param {Object} options - Format options
 * @param {number} options.decimals - Decimal places (default: 1)
 * @returns {string} Abbreviated number
 */
export function formatAbbreviated(value, options = {}) {
  const { decimals = 1 } = options;

  if (value === null || value === undefined) return 'N/A';
  if (Math.abs(value) < 1000) return formatNumber(value);

  const units = [
    { threshold: 1e9, suffix: 'B' },
    { threshold: 1e6, suffix: 'M' },
    { threshold: 1e3, suffix: 'K' },
  ];

  for (const unit of units) {
    if (Math.abs(value) >= unit.threshold) {
      const abbreviated = (value / unit.threshold).toFixed(decimals);
      return `${abbreviated}${unit.suffix}`;
    }
  }

  return formatNumber(value);
}
