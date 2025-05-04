<script lang="ts">
	import SidebarContent from "./SidebarContent.svelte";
	import SidebarHeader from "./SidebarHeader.svelte";
</script>

<aside class="max-w-sm bg-slate-800 pt-5 pb-20">
	<SidebarHeader title={"Categories"}></SidebarHeader>
	<nav>
		<SidebarContent>
			<a href="/">Programming</a>
		</SidebarContent>
		<SidebarContent>
			<a href="/">Programming</a>
		</SidebarContent>
	</nav>
</aside>
