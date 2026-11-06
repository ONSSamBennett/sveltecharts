<script>
	import { resolve } from "$app/paths";
	import { Section, Grid, Card } from "@onsvisual/svelte-components";
</script>

<Section marginTop={true}>
	<h1>Welcome to SvelteCharts</h1>
	<p>
		A comprehensive charting library for Svelte 5+, designed for the Office for National Statistics
		(ONS) with accessibility and data-driven design at its core.
	</p>
</Section>

<Section>
	<h2>Key Features</h2>
	<Grid>
		<Card title="Identity-Keyed Transitions" baseline>
			Smooth animations when data reorders, tracking elements by their identifying variables for intuitive
			visual feedback.
		</Card>
		<Card title="Accessible Tooltips" baseline>
			Four interaction modes (hover, guideline, snap, click) to handle dense data and diverse user needs.
		</Card>
		<Card title="WCAG 2.1 AA Compliant" baseline>
			Full accessibility compliance including keyboard navigation, screen reader support, and reduced
			motion respect.
		</Card>
		<Card title="Slot-Based Composition" baseline>
			Customize every chart element without forking or complex CSS, using Svelte's powerful slot API.
		</Card>
	</Grid>
</Section>

<Section>
	<h2>Get Started</h2>
	<Grid>
		<Card title="Chart Components" href={resolve("/charts")} mode="featured" baseline>
			Browse and test individual chart components with interactive examples.
		</Card>
		<Card
			title="GitHub Repository"
			href="https://github.com/ONSSamBennett/sveltecharts"
			mode="featured"
			baseline
		>
			View the source code and contribute to the project.
		</Card>
		<Card
			title="ONS Components"
			href="https://onsdigital.github.io/svelte-components/"
			mode="featured"
			baseline
		>
			Explore the ONS svelte-components library used in this UI.
		</Card>
	</Grid>
</Section>
