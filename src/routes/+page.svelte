<script lang="ts">
	import { goto } from '$app/navigation';
	import ArrowUpIcon from '$lib/shared/icons/ArrowUpIcon.svelte';

	const MIN_PLAYERS = 3;
	let total_players = $state(MIN_PLAYERS);

	const onSubmit = (event: Event) => {
		event.preventDefault();
		// @ts-ignore
		// $navigate(`/game/${total_players}`);
		goto(`/places/${total_players}`);
	};
</script>

<svelte:head>
	<title>Shpy</title>
	<meta name="description" content="A truly random game for spies." />
</svelte:head>

<form
	class="flex h-full flex-col justify-between overflow-hidden"
	onsubmit={onSubmit}
>
	<label for="total-players" class="text-center text-xl">
		Total players:
	</label>

	<div class="flex flex-col items-center justify-center">
		<button type="button" class="" onclick={() => (total_players += 1)}>
			<ArrowUpIcon class="h-20 w-20" fill="fill-neutral-300" />
		</button>

		<input
			type="number"
			id="total-players"
			bind:value={total_players}
			min={MIN_PLAYERS}
			required
			readonly
			class="w-full text-center text-9xl"
		/>

		<button
			type="button"
			class="group"
			disabled={total_players <= MIN_PLAYERS}
			onclick={() => (total_players -= 1)}
		>
			<ArrowUpIcon
				class="h-20 w-20 rotate-180"
				fill="fill-neutral-300 group-disabled:fill-neutral-600"
			/>
		</button>
	</div>

	<button
		class="btn btn-primary w-full"
		disabled={total_players <= 2}
		type="submit"
	>
		Start Game
	</button>
</form>
