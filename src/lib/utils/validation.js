/**
 * Validation utility functions for chart configurations and data
 */

/**
 * Validate chart configuration
 * @param {string} chartType - Type of chart (e.g., 'bar', 'line', 'scatter')
 * @param {Object} config - Configuration object to validate
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export function validateChartConfig(chartType, config) {
  const errors = [];

  if (!chartType) {
    errors.push('chartType is required');
    return { valid: false, errors };
  }

  if (!config || typeof config !== 'object') {
    errors.push('config must be an object');
    return { valid: false, errors };
  }

  // Common required properties
  if (!config.categoryKey && !config.xKey) {
    errors.push('categoryKey or xKey is required');
  }

  if (!config.valueKey && !config.yKey) {
    errors.push('valueKey or yKey is required');
  }

  // Optional properties with type validation
  if (config.width && typeof config.width !== 'number') {
    errors.push('width must be a number');
  }

  if (config.height && typeof config.height !== 'number') {
    errors.push('height must be a number');
  }

  if (config.margin && typeof config.margin !== 'object') {
    errors.push('margin must be an object');
  }

  if (config.tooltipMode && !['hover', 'guideline', 'snap', 'click'].includes(config.tooltipMode)) {
    errors.push('tooltipMode must be one of: hover, guideline, snap, click');
  }

  if (config.keyField && typeof config.keyField !== 'string') {
    errors.push('keyField must be a string');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate chart data format
 * @param {Array} data - Data array to validate
 * @param {Object} options - Validation options
 * @param {string} options.categoryKey - Expected category property name
 * @param {string} options.valueKey - Expected value property name
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export function validateData(data, options = {}) {
  const { categoryKey = 'category', valueKey = 'value' } = options;
  const errors = [];

  if (!Array.isArray(data)) {
    errors.push('data must be an array');
    return { valid: false, errors };
  }

  if (data.length === 0) {
    errors.push('data array must not be empty');
    return { valid: false, errors };
  }

  // Check first few items for required properties
  const samplesToCheck = Math.min(3, data.length);
  for (let i = 0; i < samplesToCheck; i++) {
    const item = data[i];

    if (typeof item !== 'object' || item === null) {
      errors.push(`data[${i}] must be an object`);
    } else {
      if (!(categoryKey in item)) {
        errors.push(`data[${i}] missing required property: ${categoryKey}`);
      }
      if (!(valueKey in item)) {
        errors.push(`data[${i}] missing required property: ${valueKey}`);
      }
    }
  }

  // Check for numeric values
  for (let i = 0; i < samplesToCheck; i++) {
    const item = data[i];
    const value = item[valueKey];

    if (value !== null && value !== undefined && typeof value !== 'number') {
      errors.push(`data[${i}].${valueKey} must be numeric`);
      break; // Only report once
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate data has no null/undefined values
 * @param {Array} data - Data array
 * @param {Array<string>} keys - Properties to check
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export function validateNoNulls(data, keys) {
  const errors = [];

  if (!Array.isArray(data)) {
    return { valid: false, errors: ['data must be an array'] };
  }

  data.forEach((item, index) => {
    keys.forEach((key) => {
      if (item[key] === null || item[key] === undefined) {
        errors.push(`data[${index}].${key} is null or undefined`);
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate chart dimensions
 * @param {number} width - Width in pixels
 * @param {number} height - Height in pixels
 * @param {Object} margin - Margin object { top, right, bottom, left }
 * @returns {Object} { valid: boolean, errors: Array<string> }
 */
export function validateDimensions(width, height, margin = {}) {
  const errors = [];
  const { top = 0, right = 0, bottom = 0, left = 0 } = margin;

  const totalWidth = width - left - right;
  const totalHeight = height - top - bottom;

  if (totalWidth <= 0) {
    errors.push(`Chart width (${totalWidth}px) too small after margins`);
  }

  if (totalHeight <= 0) {
    errors.push(`Chart height (${totalHeight}px) too small after margins`);
  }

  if (width < 200) {
    errors.push('Minimum recommended width is 200px');
  }

  if (height < 150) {
    errors.push('Minimum recommended height is 150px');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
