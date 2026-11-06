<script>
  let isDemoEmpty = true;
</script>

<section class="demo">
  <h2>Chart Components Demo</h2>
  
  {#if isDemoEmpty}
    <div class="placeholder">
      <div class="icon">📊</div>
      <h3>Chart Demo Coming Soon</h3>
      <p>
        Chart components are being developed in the <code>src/lib/charts/</code> directory.
        Once components are implemented, they'll appear here for testing.
      </p>
      
      <div class="next-steps">
        <h4>Next Steps:</h4>
        <ol>
          <li>Implement first chart: <strong>BarChart.svelte</strong></li>
          <li>Add test data in <code>src/data/</code></li>
          <li>Import and test components here</li>
          <li>Add more chart types (Phase 1)</li>
        </ol>
      </div>
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
  }
</style>
