<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { events } from "../../stores/event-store";


    export let date: Date = null;

    $: day = date?.getDate();

    const getClassNames = (currentDate: Date) => {
        const classNames = ["container"];

        if(currentDate) classNames.push("has-day");
        if(nbEvents > 0) classNames.push("has-events")

        return classNames.join(" ");
    }

    $: classNames = getClassNames(date)

    // get the number of events for the current date

    $: nbEvents = $events.filter(event => (
        date
        && event.start.getDate() === date.getDate()
        && event.start.getMonth() === date.getMonth()
        && event.start.getFullYear() === date.getFullYear()
    )).length;

    // handle click on the day cell

    const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch('click', {})
	}

</script>


<style lang="scss">

    @import "../../styles/base/mixins.scss";
    @import "../../styles/abstracts/_colors.scss";
    @import "../../styles/base/_typography.scss";

    .container {

        @include flex-container(column, nowrap, center, center);
        width: 110px;
        height: 110px;

        border: 1px solid $white-100;

        transition: all ease-in-out 0.2s;

        gap: 8px;

        p {
            @include header-2-regular;
            color: $white;
        }

        &.has-day {

            &.has-events {
                background: rgba($white, 0.03);
            }

            .events-nb {
                @include text-md-regular;
                color: $primary;
            }

            .no-events {
                @include text-md-regular;
                color: $primary-400;
            }
            
            &:hover {
                cursor: pointer;
                border-color: $primary;
                box-shadow: 0px 15px 60px $primary-200;
            }
        }
    }

</style>

<li class="{classNames}" on:click={handleClick} on:keypress={() => {}}>
    
    {#if day}
        <p>{day}</p>
        {#if nbEvents > 0}
            <p class="events-nb">{nbEvents} event{nbEvents > 1 ? "s" : ""}</p>
        {:else}
            <p class="no-events">No events</p>
        {/if}
    {/if}

</li>
