<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Props = {
		time: number;
		class: string;
		done: () => void;
	};
	const { time, done, class: class_name }: Props = $props();
	let timeLeft = $state(time);
	let interval;
	let minutes = $state(Math.floor(time / 60));
	let seconds = $state(time % 60);
	let minutes_width = $state(0);
	let double_digit_width = $state(0);
	let seconds_width = $state(0);
	let colon_width = $state(0);
	let timer_height = $state(0);

	onMount(() => {
		interval = setInterval(() => {
			if (timeLeft > 0) {
				timeLeft -= 1;
				minutes = Math.floor(timeLeft / 60);
				seconds = timeLeft % 60;
			} else {
				done();
				clearInterval(interval);
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div
	style="height: {timer_height}px; width: {minutes_width +
		seconds_width +
		colon_width}px"
	class={['relative overflow-hidden', class_name]}
>
	<span
		class="invisible absolute"
		bind:clientWidth={double_digit_width}
		bind:clientHeight={timer_height}
	>
		00
	</span>

	{#each Array.from({ length: 59 }).map((_, i) => i) as minute}
		{#if minute === minutes}
			<span
				class="absolute"
				bind:clientWidth={minutes_width}
				in:fly={{
					duration: 600,
					easing: cubicOut,
					y: -20,
				}}
				out:fly={{
					duration: 600,
					easing: cubicOut,
					y: 20,
				}}
			>
				{String(minutes).padStart(2, '0')}
			</span>
		{/if}
	{/each}

	<span
		class="absolute"
		style="left: {minutes_width}px"
		bind:clientWidth={colon_width}
	>
		:
	</span>

	{#each Array.from({ length: 60 }).map((_, i) => i) as second}
		<!-- {second} -->
		{#if second === seconds}
			<span
				class="absolute"
				style="left: {minutes_width +
					colon_width}px;width: {double_digit_width}px"
				bind:clientWidth={seconds_width}
				in:fly={{
					duration: 1000,
					easing: cubicOut,
					y: -timer_height,
				}}
				out:fly={{
					duration: 1000,
					easing: cubicOut,
					y: timer_height,
				}}
			>
				{String(seconds).padStart(2, '0')}
			</span>
		{/if}
	{/each}
</div>
