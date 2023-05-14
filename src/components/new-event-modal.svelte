<script lang="ts">
    import { events, addEvent, updateEvent, deleteEvent } from '../lib/event-store';


    // initialize form values

    let newTitle = ''
    let newEventStartDate = new Date().toISOString()
    // event end date is by default one hour after start date
    let newEventEndDate = new Date(Date.parse(newEventStartDate) + 60 * 60 * 1000).toISOString()

    let newEventColor = '#FFFFFF'

    let selectedEvent = null

    // sort events by start date

    $: $events = $events.sort((a, b) => a.start > b.start ? 1 : -1)


    // helper functions

    const createEvent = () => {
        addEvent({
            title: newTitle,
            start: new Date(newEventStartDate),
            end: new Date(newEventEndDate),
            color: newEventColor
        })
        newTitle = ''
        newEventStartDate = new Date().toISOString()
        newEventEndDate = new Date(Date.parse(newEventStartDate) + 60 * 60 * 1000).toISOString()
    }

    const saveUpdatedEvent = () => {
        updateEvent($events, selectedEvent)
        selectedEvent = null
    }


</script>

<main>
    <form on:submit|preventDefault={createEvent}>
        <input type="text" bind:value={newTitle} placeholder="Event title" required />
        <input type="datetime-local" bind:value={newEventStartDate} required />
        <!--  color picker input  -->
        <input type="color" bind:value={newEventColor} />
        <button type="submit">Add Event</button>
    </form>

    {#if selectedEvent}
        <form on:submit|preventDefault={saveUpdatedEvent}>
            <input type="text" bind:value={selectedEvent.title} placeholder="Event title" required />
            <input type="datetime-local" bind:value={selectedEvent.start} required />
            <button type="submit">Update Event</button>
            <button type="button" on:click={() => selectedEvent = null}>Cancel</button>
        </form>
    {/if}

    <div>
        {#each $events as event (event.start)}
            <div on:click={() => { selectedEvent = event }} on:keydown={() => {}}>
                <h2>{event.title}</h2>
                <p>{event.start}</p>
            </div>
        {/each}
    </div>
</main>