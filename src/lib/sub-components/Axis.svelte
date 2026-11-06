/**
 * Axis.svelte - Reusable axis component for charts
 * Renders D3-based x or y axis with labels and ticks
 */

<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  /**
   * @param {Object} scale - D3 scale (scaleLinear, scaleBand, etc.)
   * @param {string} orientation - 'horizontal' or 'vertical'
   * @param {'top'|'bottom'|'left'|'right'} position - Position relative to chart area
   * @param {string} label - Axis label text
   * @param {number} width - Available width for horizontal axis
   * @param {number} height - Available height for vertical axis
   * @param {string} labelClassName - CSS class for label styling
   * @param {boolean} showGridlines - Show gridlines for this axis
   */
  export let scale = null;
  export let orientation = 'horizontal'; // 'horizontal' or 'vertical'
  export let position = 'bottom'; // 'top', 'bottom', 'left', 'right'
  export let label = '';
  export let width = 0;
  export let height = 0;
  export let labelClassName = '';
  export let showGridlines = false;
  export let ticks = null;
  export let format = null;

  let svgElement;

  onMount(() => {
    if (!scale || !svgElement) return;

    // Create D3 axis
    let axis;
    if (position === 'bottom' || position === 'top') {
      axis = d3.axisBottom(scale);
      if (position === 'top') axis = d3.axisTop(scale);
    } else {
      axis = d3.axisLeft(scale);
      if (position === 'right') axis = d3.axisRight(scale);
    }

    // Configure ticks
    if (ticks) axis.ticks(ticks);
    if (format) axis.tickFormat(format);

    // Apply axis to SVG group
    const g = d3.select(svgElement);
    g.call(axis);

    // Styling
    g.select('.domain').style('stroke', '#999').style('stroke-width', '1');
    g.selectAll('.tick line').style('stroke', '#e5e7eb').style('stroke-width', '1');
    g.selectAll('.tick text')
      .style('font-size', '12px')
      .style('fill', '#666')
      .style('font-family', 'sans-serif');
  });
</script>

<g
  bind:this={svgElement}
  class="axis"
  class:horizontal={orientation === 'horizontal'}
  class:vertical={orientation === 'vertical'}
>
  {#if label}
    <text
      class="axis-label {labelClassName}"
      x={orientation === 'horizontal' ? width / 2 : -height / 2}
      y={position === 'bottom' ? 40 : position === 'top' ? -10 : position === 'right' ? 30 : -10}
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="14"
      fill="#333"
      font-weight="500"
    >
      {label}
    </text>
  {/if}
</g>

<style>
  :global(.axis .domain) {
    stroke: #999;
    stroke-width: 1;
  }

  :global(.axis .tick line) {
    stroke: #e5e7eb;
    stroke-width: 1;
  }

  :global(.axis .tick text) {
    font-size: 12px;
    fill: #666;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
</style>
