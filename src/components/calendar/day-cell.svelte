<script lang="ts">
    import { events } from "../../stores/event-store";


    export let date: Date = null;


    $: day = date?.getDate();

    const getClassNames = () => {
        const classNames = ["container"];

        if(day) classNames.push("has-day");

        return classNames.join(" ");
    }

    // get the number of events for the current date

    $: nbEvents = $events.filter(event => (
        date
        && event.start.getDate() === date.getDate()
        && event.start.getMonth() === date.getMonth()
        && event.start.getFullYear() === date.getFullYear()
    )).length;

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

        p {
            @include header-2-regular;
            color: $white;
        }

        &.has-day {

            .events-nb {
                @include text-md-regular;
                color: $primary;
            }

            .no-events {
                @include text-md-regular;
                color: $primary-600;
            }
            
            &:hover {
                cursor: pointer;
                border-color: $primary;
                box-shadow: 0px 15px 60px $primary-200;
            }
        }
    }

</style>

<li class="{getClassNames()}">
    
    {#if day}
        <p>{day}</p>
        {#if nbEvents > 0}
            <p class="events-nb">{nbEvents} event{nbEvents > 1 ? "s" : ""}</p>
        {:else}
            <p class="no-events">No events</p>
        {/if}
    {/if}

</li>
