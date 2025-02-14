<script lang="ts">
	import { page } from '$app/state';
	import SpyIcon from '$lib/shared/icons/SpyIcon.svelte';
	import { fade, fly } from 'svelte/transition';
	import Card from './Card.svelte';
	import type { Round } from './game.types';
	import Timer from './Timer.svelte';
	import { cubicOut } from 'svelte/easing';

	type Props = {
		rounds: Round[];
	};
	const { rounds }: Props = $props();
	const { players_count } = page.params;
	let current_round_index = $state(0);
	const current_round = $derived(rounds[current_round_index]);

	const cards = $derived.by(() =>
		Array.from({ length: +players_count }).map((_, player_index) => ({
			is_spy: current_round.spies.includes(player_index),
		})),
	);
	let current_card = $state(0);
	let timer_done = $state(false);
</script>

{#snippet card_front(player: number)}
	<div class="space-y-2 text-center">
		<span class="text-center text-2xl">Click to reveal</span>
		<br />
		<span class="text-basae text-center text-neutral-400">
			Instructions for the Player
			<br />
			<span class="text-2xl text-red-600">
				#{player}
			</span>
		</span>
	</div>
{/snippet}

{#if current_card === cards.length}
	<div class="flex h-full w-full flex-col items-center justify-center">
		<Timer
			class="mt-auto shrink-0 text-7xl"
			time={+players_count * 60}
			done={() => {
				timer_done = true;
				navigator.vibrate([200, 100, 200]);
				alert('Time is up!');
			}}
		/>

		<button
			class={[
				'btn btn-primary mt-auto w-full',
				{
					'pointer-events-none invisible': !timer_done,
				},
			]}
			onclick={() => {
				timer_done = false;
				current_card = 0;
				current_round_index += 1;
			}}
		>
			Next round
		</button>
	</div>
{:else}
	<div class="relative h-full w-full">
		{#each cards as { is_spy }, index}
			{#if index >= current_card}
				<Card
					z_index={+players_count - index}
					cover={card_front}
					args={() => [index + 1]}
				>
					<div
						in:fade={{ duration: 600, easing: cubicOut }}
						out:fade={{ duration: 600, easing: cubicOut }}
						class="absolute top-0 flex h-full w-full flex-col items-center justify-center bg-black select-none"
						role="button"
						onclick={(e) => {
							e.stopPropagation();
							current_card += 1;
						}}
					>
						{#if is_spy}
							<div
								class="mt-auto flex flex-col items-center justify-center gap-2"
							>
								<SpyIcon
									class="h-8 w-8"
									fill="fill-neutral-300"
								/>
								<span class="text-lg text-red-600">
									You're a spy!
								</span>
							</div>
						{:else}
							<div class="mt-auto space-y-2 text-center">
								<span class="block text-2xl">
									{current_round.random_place}
								</span>
								<span class="text-neutral-400">
									(you are not a spy)
								</span>
							</div>
						{/if}

						<button class="btn btn-primary mt-auto w-full">
							Click and pass the phone
						</button>
					</div>
				</Card>
			{/if}
		{/each}
	</div>
{/if}
