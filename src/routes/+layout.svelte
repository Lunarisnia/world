<script lang="ts">
	let { children } = $props();
	import "../app.css";
</script>

{@render children()}

<style lang="postcss">
	@reference "tailwindcss";
</style>
