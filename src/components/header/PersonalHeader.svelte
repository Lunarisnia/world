<script>
	import HeaderContent from "./HeaderContent.svelte";
</script>

<div class="mx-auto text-center pt-20 pb-10 font-bold bg-slate-800">
	<h1 class="font-mono text-4xl text-white">Louna's Library</h1>
	<h2 class="text-gray-500 font-mono text-xl font-thin italic">
		A dumpster of thoughts and all sorts of things
	</h2>
	<div class="mx-auto justify-center max-w-2xl">
		<nav class="grid grid-cols-3 gap-4 pt-10">
			<HeaderContent><a href="/">Home</a></HeaderContent>
			<HeaderContent><a href="/">About</a></HeaderContent>
			<HeaderContent><a href="/">Projects</a></HeaderContent>
		</nav>
		<hr class="text-stone-600 mt-3" />
	</div>
</div>
