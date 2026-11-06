<script>
	import "@onsvisual/svelte-components/css/main.css";
	import "../app.css";
	import { Header, Footer } from "@onsvisual/svelte-components";
</script>

<Header title="SvelteCharts Library" />

<slot />

<Footer compact />
