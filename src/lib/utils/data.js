/**
 * Placeholder utilities for data transformation
 * These will be expanded as the library develops
 */

/**
 * Group data by a given key
 * @param {Array} data - Array of objects
 * @param {string} key - Property to group by
 * @returns {Object} Grouped data
 */
export function groupData(data, key) {
  return data.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
}

/**
 * Filter data by a predicate
 * @param {Array} data - Array of objects
 * @param {Function} predicate - Filter function
 * @returns {Array} Filtered data
 */
export function filterData(data, predicate) {
  return data.filter(predicate);
}

/**
 * Aggregate data by a group key and method
 * @param {Array} data - Array of objects
 * @param {string} groupKey - Property to group by
 * @param {string} valueKey - Property to aggregate
 * @param {string} method - 'sum', 'avg', 'count', 'min', 'max'
 * @returns {Array} Aggregated data
 */
export function aggregateData(data, groupKey, valueKey, method = 'sum') {
  const grouped = groupData(data, groupKey);

  return Object.entries(grouped).map(([key, items]) => {
    let result = { [groupKey]: key };

    const values = items.map((item) => item[valueKey]);

    switch (method) {
      case 'sum':
        result[valueKey] = values.reduce((a, b) => a + b, 0);
        break;
      case 'avg':
        result[valueKey] = values.reduce((a, b) => a + b, 0) / values.length;
        break;
      case 'count':
        result[valueKey] = values.length;
        break;
      case 'min':
        result[valueKey] = Math.min(...values);
        break;
      case 'max':
        result[valueKey] = Math.max(...values);
        break;
      default:
        result[valueKey] = values;
    }

    return result;
  });
}

/**
 * Pivot data from long to wide format
 * @param {Array} data - Array of objects
 * @param {string} rowKey - Property for rows
 * @param {string} colKey - Property for columns
 * @param {string} valueKey - Property for values
 * @returns {Array} Pivoted data
 */
export function pivotData(data, rowKey, colKey, valueKey) {
  const pivoted = {};

  data.forEach((item) => {
    const row = item[rowKey];
    const col = item[colKey];
    const value = item[valueKey];

    if (!pivoted[row]) {
      pivoted[row] = { [rowKey]: row };
    }
    pivoted[row][col] = value;
  });

  return Object.values(pivoted);
}
