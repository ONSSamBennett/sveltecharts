<script>
	// Chart components will be imported here as we build them
	// import BarChart from '$lib/charts/BarChart.svelte';
	
	let selectedChart = 'bar';
</script>

<h2>Chart Components</h2>

<p>This page demonstrates the SvelteCharts library components as they are developed.</p>

<h3>Status: Foundation Ready</h3>
<p>
	✅ Development environment is set up and ready.<br>
	Next step: Build and test individual chart components starting with BarChart.
</p>

<div class="chart-selector">
	<h4>Select a Chart</h4>
	<div class="buttons">
		<button class:active={selectedChart === 'bar'} on:click={() => selectedChart = 'bar'}>
			Bar Chart
		</button>
		<button class:active={selectedChart === 'line'} on:click={() => selectedChart = 'line'}>
			Line Chart
		</button>
		<button class:active={selectedChart === 'column'} on:click={() => selectedChart = 'column'}>
			Column Chart
		</button>
	</div>
</div>

<div class="chart-demo">
	{#if selectedChart === 'bar'}
		<div class="placeholder">
			<p>📊 BarChart component will render here</p>
			<p><small>Coming soon...</small></p>
		</div>
	{:else if selectedChart === 'line'}
		<div class="placeholder">
			<p>📈 LineChart component will render here</p>
			<p><small>Coming soon...</small></p>
		</div>
	{:else if selectedChart === 'column'}
		<div class="placeholder">
			<p>📊 ColumnChart component will render here</p>
			<p><small>Coming soon...</small></p>
		</div>
	{/if}
</div>

<style>
	.chart-selector {
		margin: 2rem 0;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		margin: 1rem 0;
	}

	button {
		padding: 0.75rem 1.5rem;
		border: 2px solid #ddd;
		background: white;
		border-radius: 4px;
		cursor: pointer;
		font-weight: 500;
		transition: all 0.3s;
	}

	button:hover {
		border-color: #0087be;
		color: #0087be;
	}

	button.active {
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
		margin-top: 2rem;
	}

	.placeholder {
		text-align: center;
		color: #666;
	}

	.placeholder p {
		margin: 0.5rem 0;
	}

	.placeholder small {
		color: #999;
	}
</style>
