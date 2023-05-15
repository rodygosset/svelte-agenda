<script lang="ts">
    import BackButton from "../layout/back-button.svelte";
    import Modal from "../modal.svelte";
    import { events } from "../../stores/event-store";
    import NewEvent from "../forms/new-event.svelte";
    import EventListItem from "./event-list-item.svelte";

    export let isVisible = false;

    $: showModal = isVisible;

    export let closeModal = () => showModal = false
    export let day = null;

    $: dayEvents = $events.filter(event => (
        day
        && event.start.getDate() === day.getDate()
        && event.start.getMonth() === day.getMonth()
        && event.start.getFullYear() === day.getFullYear()
    ));

</script>

<style lang="scss">
    
    @import "../../styles/abstracts/_colors";
    @import "../../styles/base/_typography";
    @import "../../styles/base/_mixins";

    .modal-header {
		display: flex;
		align-items: center;
		gap: 32px;
        margin-bottom: 32px;

		h3 {
			@include header-3-regular;
		}
	}
	.event-content {
		min-height: 15rem;
        width: 100%;

        .empty {
            padding: 20px;
            color: $white-600;
            font-style: italic;
            text-align: center;
        }

        .selected-color {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
        }
            
	}

</style>

<Modal bind:showModal>

	<div slot="header" class="modal-header">
		<BackButton on:click={closeModal}/>
		<h3> {day?.toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </h3>
	</div>

	<div class="event-content">
        {#if dayEvents.length == 0}
            <p class="empty">No event planned today !</p>
        {/if}
        <ul>
            {#each dayEvents as event}
                <EventListItem {event}/>
		    {/each}
        </ul>
		<NewEvent/>
	</div>

</Modal>