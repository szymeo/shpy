<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	type Props = {
		cover: Snippet<[number]>;
		children: Snippet;
		z_index: number;
		args: () => number[];
	};

	const { cover, children, z_index, args }: Props = $props();
	let is_covered = $state(true);
</script>

<div
	onclick={() => (is_covered = false)}
	style={`z-index: ${z_index}`}
	class="relative flex h-full w-full flex-col items-center justify-center bg-black select-none"
>
	{#if is_covered}
		{@render cover(args()[0])}
	{:else}
		{@render children()}
	{/if}
</div>
