<script lang="ts">
	import CrownIcon from '$lib/shared/icons/SpyIcon.svelte';
	import { page } from '$app/state';
	import '../app.css';
	import GithubIcon from '$lib/shared/icons/GithubIcon.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="h-dvh w-dvw touch-none sm:py-4">
	<div
		class="mx-auto flex h-full max-w-sm flex-col rounded-md sm:border sm:border-neutral-600"
	>
		<nav class="sticky top-0 z-10 flex items-center justify-between px-6">
			<a href="/">
				<h1
					class="relative flex w-fit items-center justify-center gap-2 py-4 text-2xl font-extrabold uppercase"
				>
					<CrownIcon class="h-8 w-8" fill="fill-red-700" />
					Szpaj
				</h1>
			</a>

			<div class="flex gap-6 font-semibold">
				<a
					href="https://github.com/szymeo/szpaj"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-300 hover:text-white"
				>
					<GithubIcon class="h-6 w-6" fill="fill-gray-100" />
				</a>
			</div>
		</nav>

		<main class="flex flex-1 flex-col overflow-hidden p-6 pb-8">
			{@render children()}
		</main>
	</div>
</div>
