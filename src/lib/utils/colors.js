/**
 * ONS Color Palette Utilities
 * Standard color schemes used across all charts
 */

// ONS Official Color Palettes
const ONS_PALETTES = {
  // Primary categorical palette (up to 10 colors)
  categorical: [
    '#12436D', // Dark blue
    '#F66068', // Red
    '#29A0B0', // Teal
    '#801650', // Purple
    '#6C3E1D', // Brown
    '#87CEEB', // Sky blue
    '#9D8189', // Mauve
    '#A3A948', // Olive
    '#D4765F', // Burnt orange
    '#6B4423', // Dark brown
  ],

  // Sequential palette (light to dark)
  sequential: [
    '#F2F2F2', // Very light
    '#E8E8E8',
    '#CCCCCC',
    '#999999',
    '#666666',
    '#333333', // Very dark
  ],

  // Diverging palette (for data with meaningful midpoint)
  diverging: [
    '#1F77B4', // Blue
    '#AEC7E8',
    '#D3D3D3', // Light gray (neutral)
    '#FFBB78',
    '#FF7F0E', // Orange
  ],

  // Highlight palette (accent colors)
  highlight: [
    '#12436D', // Primary blue
    '#801650', // Primary purple
    '#F66068', // Primary red
  ],
};

/**
 * Get a color from a palette by index
 * @param {string} paletteName - Name of palette (categorical, sequential, diverging, highlight)
 * @param {number} index - Index in palette (wraps around if out of bounds)
 * @returns {string} Color hex code
 */
export function getPaletteColor(paletteName, index) {
  const palette = ONS_PALETTES[paletteName];
  if (!palette) {
    throw new Error(
      `Unknown palette: ${paletteName}. Available: ${Object.keys(ONS_PALETTES).join(', ')}`
    );
  }
  return palette[index % palette.length];
}

/**
 * Get entire color palette
 * @param {string} paletteName - Name of palette
 * @returns {Array} Array of color hex codes
 */
export function getPalette(paletteName) {
  return ONS_PALETTES[paletteName] || [];
}

/**
 * Get contrasting text color (black or white) for a background color
 * @param {string} bgColor - Background color hex code
 * @returns {string} '#000000' or '#FFFFFF'
 */
export function getContrastColor(bgColor) {
  // Convert hex to RGB
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance (WCAG standard)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Check if color pair meets WCAG AA contrast ratio (4.5:1)
 * @param {string} color1 - First color hex code
 * @param {string} color2 - Second color hex code
 * @returns {boolean} True if contrast ratio >= 4.5:1
 */
export function meetsWCAGAA(color1, color2) {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;

    const l =
      0.2126 * (rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4)) +
      0.7152 * (gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4)) +
      0.0722 * (bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4));

    return l;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return ratio >= 4.5;
}
