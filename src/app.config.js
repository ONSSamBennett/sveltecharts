// App configuration
export const base_prod = null; // Directory on the ONS website (null = any path)
export const base_preview = "/sveltecharts-demo"; // Directory on GitHub Pages or preview server

// Construct app_url for use in components
const isBrowser = typeof window !== 'undefined';
export const app_url = isBrowser ? window.location.origin : '';

