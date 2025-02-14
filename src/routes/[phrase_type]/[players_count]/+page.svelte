<script lang="ts">
	import Loader from '$lib/shared/Loader.svelte';
	import Game from './Game.svelte';
	import type { Round } from './game.types';

	type Props = {
		data: {
			rounds: Promise<Round[]>;
		};
	};
	const { data }: Props = $props();
</script>

{#await data.rounds}
	<div class="flex flex-col gap-8">
		<Loader class="mx-auto h-20 w-20" />

		<span class="px-8 text-center">
			Randomizing data with atmospheric noise...
		</span>
	</div>
{:then rounds}
	<Game {rounds} />
{:catch}
	<div class="flex flex-col items-center justify-center gap-4">
		There was some f*ckup, sorry.

		<button
			class="btn btn-primary w-full"
			onclick={() => location.reload()}
		>
			Try again
		</button>
	</div>
{/await}
