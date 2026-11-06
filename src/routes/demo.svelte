<script>
  import BarChart from '$components/BarChart.svelte';
  import { barChartData } from '../data/index.js';
  import { formatNumber } from '$utils';

  let chartData = [...barChartData];
  let tooltipMode = 'hover';
  let showDemo = true;

  // Config for bar chart
  const config = {
    categoryKey: 'category',
    valueKey: 'value',
    keyField: 'category',
    width: 700,
    height: 400,
    colorScheme: 'categorical',
    duration: 800,
    tooltipMode,
    showGridlines: true,
  };

  /**
   * Simulate live data update to test transitions
   */
  function updateData() {
    chartData = chartData.map((d) => ({
      ...d,
      value: Math.random() * 160 + 80,
    }));
  }

  /**
   * Shuffle data to test identity-keyed transitions
   */
  function shuffleData() {
    chartData = chartData.sort(() => Math.random() - 0.5);
  }
</script>

<section class="demo">
  <h2>🎨 Bar Chart Component Demo</h2>

  {#if showDemo}
    <!-- Controls -->
    <div class="controls">
      <div class="control-group">
        <label for="tooltip-mode">Tooltip Mode:</label>
        <select id="tooltip-mode" bind:value={tooltipMode}>
          <option value="hover">Hover (default)</option>
          <option value="guideline">Guideline (crosshair)</option>
          <option value="snap">Snap (attract cursor)</option>
          <option value="click">Click (freeze)</option>
        </select>
      </div>

      <button on:click={updateData} class="btn btn-primary">
        📊 Update Values
      </button>

      <button on:click={shuffleData} class="btn btn-secondary">
        🔀 Shuffle Data (Test Transitions)
      </button>
    </div>

    <!-- Chart -->
    <div class="chart-container">
      <BarChart data={chartData} config={{ ...config, tooltipMode }}>
        <svelte:fragment slot="title">
          <h3>Regional Performance Metrics</h3>
          <p style="margin: 0; color: #666; font-size: 0.9rem;">
            Watch how bars smoothly transition when data changes or is reordered
          </p>
        </svelte:fragment>

        <svelte:fragment slot="tooltip" let:data>
          <div style="padding: 0.5rem;">
            <strong>{data.category}</strong>
            <div style="margin-top: 0.25rem;">
              Value: <strong>{formatNumber(data.value, { decimals: 1 })}</strong>
            </div>
            {#if data.group}
              <div style="font-size: 0.85em; opacity: 0.7; margin-top: 0.25rem;">
                {data.group}
              </div>
            {/if}
          </div>
        </svelte:fragment>

        <svelte:fragment slot="footer">
          <p style="margin: 0; font-size: 0.85rem;">
            Data source: Sample dataset | Last updated: {new Date().toLocaleString()}
          </p>
        </svelte:fragment>
      </BarChart>
    </div>

    <!-- Info Panel -->
    <div class="info-panel">
      <h4>✨ Features Demonstrated</h4>
      <ul>
        <li>
          <strong>Identity-Keyed Transitions:</strong> Bars smoothly move to new positions when data
          reorders (click "Shuffle Data")
        </li>
        <li>
          <strong>Reactive Data Binding:</strong> Charts update smoothly when data changes (click
          "Update Values")
        </li>
        <li>
          <strong>Accessible Tooltips:</strong> Multiple interaction modes for dense data exploration
        </li>
        <li>
          <strong>Slot-Based Composition:</strong> Title, tooltip, and footer are customizable
        </li>
        <li>
          <strong>Responsive Design:</strong> Adapts to screen size
        </li>
        <li>
          <strong>WCAG 2.1 AA:</strong> Accessible to keyboard navigation and screen readers
        </li>
      </ul>
    </div>
  {/if}
</section>

<style>
  .demo {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .demo h2 {
    margin-top: 0;
    color: #1e40af;
  }

  .placeholder {
    text-align: center;
    padding: 3rem 2rem;
    background: #f9fafb;
    border-radius: 6px;
    border: 2px dashed #e5e7eb;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .placeholder h3 {
    margin: 1rem 0;
    color: #1f2937;
  }

  .placeholder p {
    color: #666;
    margin: 1rem 0;
  }

  code {
    background: #f3f4f6;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
  }

  .next-steps {
    background: white;
    padding: 1.5rem;
    border-radius: 6px;
    margin-top: 2rem;
    text-align: left;
    display: inline-block;
  }

  .next-steps h4 {
    margin-top: 0;
    color: #1e40af;
  }

  .next-steps ol {
    margin: 0;
    padding-left: 1.5rem;
  }

  .next-steps li {
    margin: 0.5rem 0;
    color: #333;
  }

  strong {
    color: #1e40af;
    font-weight: 600;
  }

  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 6px;
  }

  .control-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .control-group label {
    font-weight: 500;
    color: #333;
  }

  .control-group select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #1e40af;
    color: white;
  }

  .btn-primary:hover {
    background: #1e3a8a;
  }

  .btn-secondary {
    background: #6b7280;
    color: white;
  }

  .btn-secondary:hover {
    background: #4b5563;
  }

  .chart-container {
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
  }

  .info-panel {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f0f9ff;
    border-left: 4px solid #1e40af;
    border-radius: 4px;
  }

  .info-panel h4 {
    margin-top: 0;
    color: #1e40af;
  }

  .info-panel ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .info-panel li {
    margin: 0.75rem 0;
    color: #333;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .demo {
      padding: 1rem;
    }

    .placeholder {
      padding: 2rem 1rem;
    }

    .icon {
      font-size: 2rem;
    }

    .controls {
      flex-direction: column;
      align-items: flex-start;
    }

    .control-group {
      width: 100%;
    }

    .control-group select {
      width: 100%;
    }

    .btn {
      width: 100%;
    }

    .chart-container {
      padding: 1rem;
      margin: 1rem 0;
    }
  }
</style>
