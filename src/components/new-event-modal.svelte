<script lang="ts">
    import { events, addEvent, updateEvent } from '../stores/event-store';
    import disk from '../styles/images/disk.svg';


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

<style lang="scss">

    @import '../styles/abstracts/_colors.scss';
    @import '../styles/base/_typography.scss';
    @import '../styles/abstracts/variables.scss';

    h1 {
        color: $primary;
        @include header-1-regular;
        margin-bottom: 20px;
    }
 
    .cta-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background-color: $primary;
        @include typo-maker($text-sm-font-size, $font-weight-medium);
        color: $white;
        width: 70%;
        height: 35px;
        margin-top: 10px;
        gap: 5px;
    }

    p {
        @include typo-maker($text-xs-font-size, $font-weight-regular);
    }

    .form-field {
        background-color: $black-600;
        color: $white;
        width: 70%;
        padding: 8px;
        align-items: center;
        justify-content: center;
    }

    .dateContainer {
        display: flex;
        justify-content: start;
        gap: 16px;
    }

    .date-selector {
        width: 110px;
        height: 75px;
        background-color: $black-600;
    }   

    .containerNewForm {
        display: flex;
        flex-direction: column;
        gap: 16px;
      
    }

    .date-selector {
    color: $white; 
    width: 155px;
    
    }

    .form-field::placeholder, .date-selector::placeholder {
    /* Chrome, Firefox, and newer versions of Opera */
    color: $white;
    opacity: 1; /* Firefox needs this to display the color */
    @include typo-maker($text-xs-font-size, $font-weight-regular);
    flex:1;
    }

</style>

<main>
    <h1>New Event Form</h1>
    <form on:submit|preventDefault={createEvent}>
        <div class="containerNewForm">
            <input class="form-field" type="text" bind:value={newTitle} placeholder="Event title" required />
            <div class="dateContainer">
                <div class="start">
                    <p>Start</p>
                    <input class="date-selector" type="datetime-local" bind:value={newEventStartDate} required />
                </div>
                <div class="end">
                    <p>End</p>
                    <input class="date-selector" type="datetime-local" bind:value={newEventEndDate} required />
                </div>
            </div>
            <button class="cta-button" type="submit">
                <img src={disk} alt="Disquette SVG" />
                Save
            </button>
        </div>
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
