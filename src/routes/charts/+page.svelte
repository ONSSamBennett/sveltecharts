<script>
	import { resolve } from "$app/paths";
	import { Section, Button, Grid, Card } from "@onsvisual/svelte-components";

	let selectedChart = "bar";
</script>

<Section marginTop={true}>
	<h1>Chart Components</h1>
	<p>This page demonstrates the SvelteCharts library components as they are developed.</p>
</Section>

<Section>
	<h2>Select a Chart Type</h2>
	<div class="button-group">
		<Button on:click={() => (selectedChart = "bar")} selected={selectedChart === "bar"}>
			Bar Chart
		</Button>
		<Button on:click={() => (selectedChart = "line")} selected={selectedChart === "line"}>
			Line Chart
		</Button>
		<Button on:click={() => (selectedChart = "column")} selected={selectedChart === "column"}>
			Column Chart
		</Button>
	</div>
</Section>

<Section>
	<div class="chart-demo">
		{#if selectedChart === "bar"}
			<div class="placeholder">
				<h3>📊 BarChart Component</h3>
				<p>Horizontal bar chart with identity-keyed transitions</p>
				<p class="status">Coming soon...</p>
			</div>
		{:else if selectedChart === "line"}
			<div class="placeholder">
				<h3>📈 LineChart Component</h3>
				<p>Single and multi-series line charts with smooth transitions</p>
				<p class="status">Coming soon...</p>
			</div>
		{:else if selectedChart === "column"}
			<div class="placeholder">
				<h3>📊 ColumnChart Component</h3>
				<p>Vertical column chart with optional stacking</p>
				<p class="status">Coming soon...</p>
			</div>
		{/if}
	</div>
</Section>

<Section>
	<h2>Chart Status</h2>
	<p>Chart components are under development. Check back soon for interactive examples.</p>
	<Grid>
		<Card title="View Specifications" href="https://github.com/ONSSamBennett/sveltecharts" baseline>
			See the USER_NEEDS.md and REQUIREMENTS.md for complete specifications.
		</Card>
		<Card title="GitHub Issues" href="https://github.com/ONSSamBennett/sveltecharts/issues" baseline>
			Track development progress and contribute feedback.
		</Card>
	</Grid>
</Section>

<style>
	.button-group {
		display: flex;
		gap: 1rem;
		margin: 1.5rem 0;
		flex-wrap: wrap;
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
</style>
