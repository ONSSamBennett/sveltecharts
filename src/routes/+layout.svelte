<script>
	import '../app.css';
</script>

<div class="container">
	<header>
		<h1>📊 SvelteCharts Development</h1>
		<nav>
			<a href="/">Home</a>
			<a href="/charts">Charts Demo</a>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>SvelteCharts Library - Development & Testing</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		background: #222;
		color: #fff;
		padding: 2rem;
		border-bottom: 3px solid #0087be;
	}

	header h1 {
		margin: 0 0 1rem 0;
	}

	nav {
		display: flex;
		gap: 2rem;
	}

	nav a {
		color: #fff;
		text-decoration: none;
		font-weight: 500;
		border-bottom: 2px solid transparent;
		padding-bottom: 4px;
		transition: border-color 0.3s;
	}

	nav a:hover {
		border-bottom-color: #0087be;
	}

	main {
		flex: 1;
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	footer {
		background: #f5f5f5;
		padding: 2rem;
		text-align: center;
		border-top: 1px solid #ddd;
		margin-top: 3rem;
		color: #666;
	}

	footer p {
		margin: 0;
	}
</style>
