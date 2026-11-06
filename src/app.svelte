<script>
  import { onMount } from 'svelte';
  import Demo from './routes/demo.svelte';
  
  let currentPage = 'home';
</script>

<main>
  <header class="header">
    <h1>🎨 SvelteCharts Test App</h1>
    <p>Development environment for testing chart components</p>
  </header>

  <nav class="nav">
    <button on:click={() => (currentPage = 'home')} class:active={currentPage === 'home'}>
      Home
    </button>
    <button on:click={() => (currentPage = 'demo')} class:active={currentPage === 'demo'}>
      Chart Demo
    </button>
  </nav>

  <div class="content">
    {#if currentPage === 'home'}
      <section class="hero">
        <h2>Welcome to SvelteCharts</h2>
        <p>
          This app is for testing and developing chart components in real-time. Navigate to the
          <strong>Chart Demo</strong> page to see examples as they're built.
        </p>

        <div class="info-grid">
          <div class="card">
            <h3>📊 Chart Components</h3>
            <p>Test individual chart types with various configurations and data sets.</p>
          </div>
          <div class="card">
            <h3>🎯 Data Binding</h3>
            <p>Verify reactive data updates, transitions, and smooth animations.</p>
          </div>
          <div class="card">
            <h3>♿ Accessibility</h3>
            <p>Test keyboard navigation, screen readers, and WCAG 2.1 AA compliance.</p>
          </div>
          <div class="card">
            <h3>🎨 Composition</h3>
            <p>Try slot-based customization and component composition patterns.</p>
          </div>
        </div>

        <section class="status">
          <h3>MVP Development Status</h3>
          <ul>
            <li>✅ Project structure and build configuration</li>
            <li>✅ Test app and demo pages</li>
            <li>🔄 First chart component (BarChart) - Coming soon</li>
            <li>⏳ Additional chart types (Phase 1)</li>
            <li>⏳ Storybook setup (Phase 2)</li>
          </ul>
        </section>
      </section>
    {:else if currentPage === 'demo'}
      <Demo />
    {/if}
  </div>

  <footer class="footer">
    <p>SvelteCharts MVP © 2026 | Development Build</p>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .header {
    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
    color: white;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    margin: 0;
    font-size: 2rem;
  }

  .header p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
  }

  .nav {
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 1rem;
  }

  .nav button {
    background: none;
    border: 2px solid #e5e7eb;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .nav button:hover {
    border-color: #1e40af;
    color: #1e40af;
  }

  .nav button.active {
    background: #1e40af;
    color: white;
    border-color: #1e40af;
  }

  .content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .hero {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .hero h2 {
    margin-top: 0;
    color: #1e40af;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .card {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 6px;
    border-left: 4px solid #1e40af;
  }

  .card h3 {
    margin-top: 0;
    color: #1e40af;
  }

  .card p {
    margin: 0.5rem 0 0 0;
    color: #666;
  }

  .status {
    background: #f0f9ff;
    border: 1px solid #bfdbfe;
    padding: 1.5rem;
    border-radius: 6px;
    margin-top: 2rem;
  }

  .status h3 {
    margin-top: 0;
    color: #1e40af;
  }

  .status ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .status li {
    margin: 0.5rem 0;
    color: #333;
  }

  .footer {
    background: #1f2937;
    color: white;
    text-align: center;
    padding: 2rem;
    font-size: 0.9rem;
  }

  .footer p {
    margin: 0;
  }

  @media (max-width: 768px) {
    .header {
      padding: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
    }

    .content {
      padding: 1rem;
    }
  }
</style>
