<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { events, type AgendaEvent } from '../../stores/event-store';
    import { format24H } from '../../utils';
    import Button from '../button.svelte';
    import ColorInput from './color-input.svelte';
    import TextInput from './text-input.svelte';
    import TimeInput from './time-input.svelte';

    export let date: Date = new Date()

    export let currentEvent: AgendaEvent = null
    let originalTitle: string = currentEvent?.title


    const getEmptyEvent = (): AgendaEvent => ({
        title: '',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        color: '#FFFFFF',
        description: ''
    })

    let newEvent = getEmptyEvent()

    let startTime = format24H(currentEvent ? currentEvent.start : newEvent.start)
    let endTime = format24H(currentEvent ? currentEvent.end : newEvent.end)

    const reset = () => {
        newEvent = getEmptyEvent()
        startTime = format24H(newEvent.start)
        endTime = format24H(newEvent.end)
        originalTitle = null
    }


    
    // build start and end dates from the given date and time

    const buildEventDates = () => {

        let start = new Date(currentEvent ? currentEvent.start : date)
        start.setHours(Number(startTime.split(':')[0]))
        start.setMinutes(Number(startTime.split(':')[1]))

        let end = new Date(currentEvent ? currentEvent.start : date)
        end.setHours(Number(endTime.split(':')[0]))
        end.setMinutes(Number(endTime.split(':')[1]))

        if(end < start) end = start

        return { start, end }
    }

    // Create an event with the given title, start and end dates, and color

    const saveEvent = () => {

        const { start, end } = buildEventDates()
        

        // add event to store

        events.addEvent({...newEvent, start, end})

        // reset form

        reset()

        dispatch('close', {})
    }

    // update the current event

    const updateEvent = () => {
        if(!currentEvent) return

        const { start, end } = buildEventDates()

        events.updateEvent(originalTitle, {...currentEvent, start, end})

        reset()
        dispatch('close', {})
    }


    const dispatch = createEventDispatcher();

    const cancel = () => {
        reset()
        dispatch('close', {})
    } 

</script>

<style lang="scss">

    @import '../../styles/abstracts/_colors.scss';
    @import '../../styles/base/_typography.scss';
    @import '../../styles/base/_mixins.scss';

    form {
        @include flex-container(column, nowrap, flex-start, stretch);
        width: 100%;
        padding: 16px;
        gap: 16px;

        border: 1px solid $white-100;
    }



    input {

        @include reset-form-input;

        &[type="color"] {

            width: 40px;
            height: 40px;
            cursor: pointer;
            background: transparent; 

            &::-moz-color-swatch, &::-webkit-color-swatch, &::-webkit-color-swatch-wrapper {
                border: none;
                border-color: transparent;
            }

            &::-webkit-color-swatch-wrapper {
                padding: 0;
                border-radius: 0;
            }
        }
    }

    fieldset {
        @include flex-container(row, nowrap, flex-start, center);
        gap: 16px;

        border: none;
        padding: 0;
    }

    .field {
        @include flex-container(column, nowrap, flex-start, stretch);
        gap: 8px;

        label {
            @include text-md-regular;
            color: $white-600;
        }
    }

    textarea {
        @include reset-form-input;
        @include text-md-regular;

        width: 100%;
        padding: 8px;
        min-height: 100px;
        resize: vertical;

        background: $white-100;
        color: $white;

        &::placeholder {
            color: $white-400;
        }
    }

</style>

{#if !currentEvent}

    <!-- if we're adding a new event to the list -->

    <form on:submit|preventDefault={saveEvent}>
        <fieldset>
            <ColorInput bind:value={newEvent.color} name="color" />
            <TextInput 
                bind:value={newEvent.title} 
                name="title"
                placeholder="Title" 
                required 
                fullWidth 
            />
        </fieldset>
        <fieldset>
            <div class="field">
                <label for="start-time">Start</label>
                <TimeInput bind:value={startTime} name="start-time" required />
            </div>
            <div class="field">
                <label for="end-time">End</label>
                <TimeInput bind:value={endTime} name="end-time" required />
            </div>
        </fieldset>
        <textarea name="description" id="description" placeholder="Describe the event here..." bind:value={newEvent.description}/>
        <fieldset>
            <Button role="secondary" fullWidth on:click={cancel}>Cancel</Button>
            <Button type="submit" icon="fa-floppy-disk" fullWidth on:click={saveEvent}>Save</Button>
        </fieldset>

    </form>

{:else}

    <!-- if we're updating an existing event -->

    <form on:submit|preventDefault={updateEvent}>
        <fieldset>
            <ColorInput bind:value={currentEvent.color} name="color" />
            <TextInput 
                bind:value={currentEvent.title} 
                name="title"
                placeholder="Title" 
                required 
                fullWidth 
            />
        </fieldset>
        <fieldset>
            <div class="field">
                <label for="start-time">Start</label>
                <TimeInput bind:value={startTime} name="start-time" required />
            </div>
            <div class="field">
                <label for="end-time">End</label>
                <TimeInput bind:value={endTime} name="end-time" required />
            </div>
        </fieldset>
        <textarea name="description" id="description" placeholder="Describe the event here..." bind:value={currentEvent.description}/>
        <fieldset>
            <Button role="secondary" fullWidth on:click={cancel}>Cancel</Button>
            <Button type="submit" icon="fa-floppy-disk" fullWidth on:click={updateEvent}>Save</Button>
        </fieldset>

    </form>


{/if}