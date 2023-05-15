<script lang="ts">
    import BackButton from "../layout/back-button.svelte";
    import Modal from "../modal.svelte";
    import { events } from "../../stores/event-store";
    import NewEvent from "../forms/new-event.svelte";

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

    /**
     * Format the date to AM/PM
     * @param date The date to format
     * @returns The formatted date
     */

    const formatAMPM = (date: Date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours || 12;

        let minutesStr = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutesStr + ' ' + ampm;
    }
</script>

<style lang="scss">
    @import "../../styles/globals.scss";
    @import "../../styles/abstracts/colors";
    @import "../../styles/base/typography";

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

        .event-card {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            margin-bottom: 32px;
            border: 1px solid $white-200;

            .selected-color {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
            }

            div {
                //mettre à 80% pour corriger le pb d'ellipse
                width: 100%;
            }

            .event-title {
                margin: 0 0 7px;
                @include header-4-regular;
                @include text-overflow-ellipsis;
                width: 280px;
            }

            .event-date {
                margin: 7px 0 0;
                color: $white-600;
            }
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
            <div class="empty">No event planned today !</div>
        {/if}
		{#each dayEvents as event}
			<div class="event-card">
				<span class="selected-color" style="background-color: {event.color};"></span>
				<div>
					<h4 class="event-title">{event.title}</h4>
					<p class="event-date">From {formatAMPM(event.start)} to {formatAMPM(event.end)}</p>
				</div>
			</div>
		{/each}
		<NewEvent/>
	</div>

</Modal>