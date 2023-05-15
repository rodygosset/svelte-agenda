

<script lang="ts">
    import { events, type AgendaEvent } from "../../stores/event-store";
    import { formatAMPM } from "../../utils";
    import Button from "../button.svelte";
    import EventForm from "../forms/event-form.svelte";


    export let event: AgendaEvent = null;

    let editMode = false;

</script>

<style lang="scss">

    @import "../../styles/abstracts/_colors";
    @import "../../styles/base/_typography";
    @import "../../styles/base/_mixins";

    .selected-color {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
    }

    .event {

        &-card {
            width: 100%;
            @include flex-container(row, nowrap, flex-start, center);
            gap: 16px;
            padding: 16px;
            border: 1px solid $white-200;
        }

        &-text-content {
            @include flex-container(column, nowrap, flex-start, flex-start);
            gap: 8px;
        }

        &-title {
            @include header-4-regular;
            @include text-overflow-ellipsis;
            width: 280px;
        }

        &-date {
            @include text-md-regular;
            color: $white-600;
        }

        &-description {
            @include text-overflow-ellipsis;
            @include text-md-regular;
            width: 280px;

            &-empty {
                @extend .event-description;
                color: $white-400;
                font-style: italic;
            }
        }
    }

    .buttons-container {
        @include flex-container(row, nowrap, flex-end, center);
        gap: 8px;
        width: 100%;
    }
</style>


{#if event}
    {#if !editMode}
        <li class="event-card">
            <span class="selected-color" style="background-color: {event.color};"></span>
            <div class="event-text-content">
                <h4 class="event-title">{event.title}</h4>
                <p class="event-date">From {formatAMPM(event.start)} to {formatAMPM(event.end)}</p>
                {#if !event.description}
                    <p class="event-description-empty">No description provided</p>
                {:else}
                    <p class="event-description">{event.description}</p>
                {/if}
            </div>
            <div class="buttons-container">
                <!-- edit button -->
                <Button 
                    icon="fa-pen-to-square"
                    role="tertiary"
                    on:click={() => editMode = true}
                />
                <!-- delete button -->
                <Button 
                    icon="fa-trash-alt"
                    role="tertiary"
                    on:click={() => events.deleteEvent(event)}
                />
            </div>
        </li>
    {:else}
        <EventForm 
            currentEvent={event}
            on:close={() => editMode = false}
        />
    {/if}
{/if}