<script lang="ts">
	const { class: class_name = '' } = $props();
</script>

<div class={[class_name, 'flex items-center justify-center']}>
	<div class={'loader'}></div>
</div>

<style>
	.loader {
		width: 40px;
		height: 40px;
		--c: no-repeat linear-gradient(#c10007 0 0);
		background: var(--c), var(--c), var(--c), var(--c);
		background-size: 21px 21px;
		animation: l5 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
	}
	@keyframes l5 {
		0% {
			background-position:
				0 0,
				100% 0,
				100% 100%,
				0 100%;
		}
		33% {
			background-position:
				0 0,
				100% 0,
				100% 100%,
				0 100%;
			width: 60px;
			height: 60px;
		}
		66% {
			background-position:
				100% 0,
				100% 100%,
				0 100%,
				0 0;
			width: 60px;
			height: 60px;
		}
		100% {
			background-position:
				100% 0,
				100% 100%,
				0 100%,
				0 0;
		}
	}
</style>
