<script> 
	export let showModal = false; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog) { showModal ? dialog.showModal() : dialog.close() }
	
</script>

<style lang="scss">
	@import "../styles/abstracts/_colors.scss";
	@import "../styles/base/_mixins.scss";

	dialog {

		@include flex-container(column, nowrap, flex-start, stretch);
		gap: 32px;
		min-width: 600px;
		border: 1px solid $white-200;
		background: $black;
		max-height: 80vh;
		color: $white;
		padding: 32px;

		&::backdrop {
			background: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(3px);
		}

		&[open] {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

			&::backdrop {
				animation: fade 0.2s ease-out;
			}
		}

	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>


<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<slot name="header" />
	<slot />
</dialog>