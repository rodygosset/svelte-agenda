<script lang="ts">
    import { events } from '../stores/event-store';

    let newTitle = '';
    let newEventStartDate = new Date().toISOString();
    let newEventEndDate = new Date(Date.parse(newEventStartDate) + 60 * 60 * 1000).toISOString();
    let newEventColor = '#00B4D8';

    // Create an event with the given title, start and end dates, and color
    const createEvent = () => {
        events.addEvent({
            title: newTitle,
            start: new Date(newEventStartDate),
            end: new Date(newEventEndDate),
            color: newEventColor,
            description: ''
        });
        
        newTitle = '';
        newEventStartDate = new Date().toISOString();
        newEventEndDate = new Date(Date.parse(newEventStartDate) + 60 * 60 * 1000).toISOString();
    }

    const cancelCreation = () => {
        newTitle = '';
        newEventStartDate = new Date().toISOString();
        newEventEndDate = new Date(Date.parse(newEventStartDate) + 60 * 60 * 1000).toISOString();
    }
</script>

<style lang="scss">
    @import '../styles/abstracts/_colors.scss';
    @import '../styles/base/_typography.scss';
    @import '../styles/abstracts/variables.scss';

    .cta-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        background-color: $primary;
        @include typo-maker($text-sm-font-size, $font-weight-medium);
        color: $white;
        height: 35px;
        margin-top: 10px;
        gap: 5px;
        width: 50%; 
        box-sizing: border-box; 
    }

    p {
        @include typo-maker($text-xs-font-size, $font-weight-regular);
    }

    .form-field {
        @include reset-form-input;
        background-color: $black-600;
        color: $white;
        width: 100%;
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

    .cta-buttons {
        display: flex;
        gap: 20px; 
    }

    .cta-button i.fa-save {
    font-size: 18px; 
}

    .color-selector {
        width: 40px;
        height: 40px;
        background-color: $primary;
        border: none;
        margin-right: 10px;
    }

    .title-container {
        display: flex;
        align-items: center;
    }
    .containerNewForm {
        border: 1px solid #00B4D8; 
        padding: 20px;
        border-radius: 10px;
    }

    .color-selector {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border: none; 
        background-color: var(--newEventColor); 
    }

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
    }

</style>

<main>
    <div class="">
        <div class="modal-content">
            <form on:submit|preventDefault={createEvent}>
                <div class="containerNewForm">
                    <div class="title-container">
                        <input class="color-selector" type="color" bind:value={newEventColor} />
                        <input class="form-field" type="text" bind:value={newTitle} placeholder="Event title" required />
                    </div>
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
                <div class="cta-buttons">
                    <button class="cta-button" type="button" on:click={cancelCreation}>
                        Cancel
                    </button>
                    <button class="cta-button" type="submit">
                        <i class="far fa-save"></i>
                        <span class="button-text">Save</span>
                    </button>
                </div>
        </div>
            </form>
    </div>
</main>
