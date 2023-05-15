<script lang="ts">
    import BackButton from "../layout/back-button.svelte";
    import Modal from "../modal.svelte";
    import { events } from "../../stores/event-store";
    import EventForm from "../forms/event-form.svelte";
    import EventListItem from "./event-list-item.svelte";
    import Button from "../button.svelte";
    import { createEventDispatcher } from "svelte";


    export let date: Date = null;
    export let show: boolean = false;

    let showForm = false;

    $: dayEvents = $events.filter(event => (
        date
        && event.start.getDate() === date.getDate()
        && event.start.getMonth() === date.getMonth()
        && event.start.getFullYear() === date.getFullYear()
    ));

    const dispatch = createEventDispatcher()

    const closeModal = () => {
        dispatch('close', {})
    } 

</script>

<style lang="scss">
    
    @import "../../styles/abstracts/_colors";
    @import "../../styles/base/_typography";
    @import "../../styles/base/_mixins";

    .modal-header {
		@include flex-container(row, nowrap, space-between, center);
		gap: 32px;

		h3 {
			@include header-3-regular;
		}
	}
	.events {
        @include flex-container(column, nowrap, flex-start, stretch);
        gap: 32px;
		flex: 1;
        .empty {
            padding: 20px;
            color: $white-600;
            font-style: italic;
            text-align: center;
        }
            
	}

    .row-container {
        @include flex-container(row, nowrap, flex-start, center);
        gap: 16px;
    }

    ul {
        @include reset-list;
        @include flex-container(column, nowrap, flex-start, flex-start);
        gap: 16px;
    }

</style>

<Modal bind:showModal={show}>

	<section slot="header" class="modal-header">
		<div class="row-container">
            <BackButton on:click={closeModal}/>
		    <h3>{date?.toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        </div>
        {#if !showForm}
            <Button icon="fa-plus" on:click={() => showForm = true}>Add event</Button>
        {/if}
    </section>

	<section class="events">
        {#if showForm}
            <EventForm date={date} on:close={() => showForm = false}/>
        {/if}
        {#if dayEvents.length == 0}
            <p class="empty">No event planned today !</p>
        {/if}
        <ul>
            {#each dayEvents as event}
                <EventListItem {event}/>
		    {/each}
        </ul>
	</section>

</Modal>