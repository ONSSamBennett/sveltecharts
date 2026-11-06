/**
 * Tooltip.svelte - Accessible tooltip component with multiple interaction modes
 * Supports: hover, guideline, snap, click modes
 */

<script>
  import { getPaletteColor, getContrastColor } from '$utils';

  /**
   * @param {Object} data - Tooltip data to display
   * @param {string} mode - 'hover' | 'guideline' | 'snap' | 'click'
   * @param {Object} position - { x, y } position in pixels
   * @param {boolean} visible - Whether tooltip is shown
   * @param {Object} config - Custom configuration
   * @param {number} config.snapThreshold - Pixels to snap (default: 40)
   */
  export let data = null;
  export let mode = 'hover';
  export let position = { x: 0, y: 0 };
  export let visible = false;
  export let config = {};

  const { snapThreshold = 40 } = config;

  /**
   * Format tooltip content - default template
   * Can be overridden via slot
   */
  function formatDefault() {
    if (!data) return '';
    return `
      <strong>${data.category || data.label || 'Value'}</strong>
      <div>${data.value}</div>
      ${data.series ? `<div style="opacity: 0.7; font-size: 0.9em;">${data.series}</div>` : ''}
    `;
  }
</script>

{#if visible && data}
  <div
    class="tooltip"
    class:hover={mode === 'hover'}
    class:guideline={mode === 'guideline'}
    class:snap={mode === 'snap'}
    class:click={mode === 'click'}
    style="left: {position.x}px; top: {position.y}px;"
  >
    <div class="tooltip-inner">
      <!-- Allow custom tooltip content via slot -->
      <slot {data}>
        {@html formatDefault()}
      </slot>
    </div>
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 1.4;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -100%);
    margin-top: -8px;
    white-space: nowrap;
  }

  .tooltip-inner {
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* Accessibility: reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    .tooltip {
      animation: none;
    }
  }

  /* Different visual treatment per mode */
  .tooltip.hover {
    border-color: #1e40af;
  }

  .tooltip.guideline {
    border-color: #1e40af;
    background: rgba(255, 255, 255, 0.95);
  }

  .tooltip.snap {
    border-color: #29a0b0;
    background: #f0f9ff;
  }

  .tooltip.click {
    border-color: #12436d;
    background: white;
    border-width: 2px;
  }
</style>
