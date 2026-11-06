<script>
  import { Header, Footer, Section, Card, Grid, Button } from '@onsvisual/svelte-components'
  
  let currentPage = 'home'
  let selectedChart = 'bar'
</script>

<Header title="SvelteCharts Library" />

{#if currentPage === 'home'}
  <Section marginTop={true}>
    <h1>Welcome to SvelteCharts</h1>
    <p>A comprehensive charting library for Svelte 5+, designed for the Office for National Statistics (ONS) with accessibility and data-driven design at its core.</p>
  </Section>

  <Section>
    <h2>Key Features</h2>
    <Grid>
      <Card title="Identity-Keyed Transitions" baseline>
        Smooth animations when data reorders, tracking elements by their identifying variables for intuitive visual feedback.
      </Card>
      <Card title="Accessible Tooltips" baseline>
        Four interaction modes (hover, guideline, snap, click) to handle dense data and diverse user needs.
      </Card>
      <Card title="WCAG 2.1 AA Compliant" baseline>
        Full accessibility compliance including keyboard navigation, screen reader support, and reduced motion respect.
      </Card>
      <Card title="Slot-Based Composition" baseline>
        Customize every chart element without forking or complex CSS, using Svelte's powerful slot API.
      </Card>
    </Grid>
  </Section>

  <Section>
    <h2>Get Started</h2>
    <Grid>
      <Card title="Chart Components" baseline>
        <button on:click={() => currentPage = 'charts'} style="padding: 0.75rem 1.5rem; background: #0087be; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">View Charts Demo →</button>
      </Card>
      <Card title="GitHub Repository" baseline>
        <a href="https://github.com/ONSSamBennett/sveltecharts" target="_blank" style="color: #0087be; text-decoration: none; font-weight: 500;">Open GitHub →</a>
      </Card>
      <Card title="ONS Components" baseline>
        <a href="https://onsdigital.github.io/svelte-components/" target="_blank" style="color: #0087be; text-decoration: none; font-weight: 500;">View Components Library →</a>
      </Card>
    </Grid>
  </Section>

{:else if currentPage === 'charts'}
  <Section marginTop={true}>
    <h1>Chart Components</h1>
    <p>This page demonstrates the SvelteCharts library components as they are developed.</p>
    <button on:click={() => currentPage = 'home'} style="padding: 0.75rem 1.5rem; background: #ddd; color: #222; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">← Back to Home</button>
  </Section>

  <Section>
    <h2>Select a Chart Type</h2>
    <div class="button-group">
      <button class:active={selectedChart === 'bar'} on:click={() => selectedChart = 'bar'}>Bar Chart</button>
      <button class:active={selectedChart === 'line'} on:click={() => selectedChart = 'line'}>Line Chart</button>
      <button class:active={selectedChart === 'column'} on:click={() => selectedChart = 'column'}>Column Chart</button>
    </div>
  </Section>

  <Section>
    <div class="chart-demo">
      {#if selectedChart === 'bar'}
        <div class="placeholder">
          <h3>📊 BarChart Component</h3>
          <p>Horizontal bar chart with identity-keyed transitions</p>
          <p class="status">Coming soon...</p>
        </div>
      {:else if selectedChart === 'line'}
        <div class="placeholder">
          <h3>📈 LineChart Component</h3>
          <p>Single and multi-series line charts with smooth transitions</p>
          <p class="status">Coming soon...</p>
        </div>
      {:else if selectedChart === 'column'}
        <div class="placeholder">
          <h3>📊 ColumnChart Component</h3>
          <p>Vertical column chart with optional stacking</p>
          <p class="status">Coming soon...</p>
        </div>
      {/if}
    </div>
  </Section>
{/if}

<Footer compact />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin: 1.5rem 0;
    flex-wrap: wrap;
  }

  .button-group button, button {
    padding: 0.75rem 1.5rem;
    border: 2px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
  }

  .button-group button:hover, button:hover {
    border-color: #0087be;
    color: #0087be;
  }

  .button-group button.active {
    background: #0087be;
    color: white;
    border-color: #0087be;
  }

  .chart-demo {
    background: #f5f5f5;
    border-radius: 4px;
    padding: 3rem;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    border: 1px solid #ddd;
  }

  .placeholder {
    text-align: center;
    color: #666;
  }

  .placeholder h3 {
    margin: 0 0 0.5rem 0;
    color: #222;
  }

  .placeholder p {
    margin: 0.5rem 0;
  }

  .placeholder .status {
    color: #999;
    font-style: italic;
  }

  a {
    color: #0087be;
  }
</style>
