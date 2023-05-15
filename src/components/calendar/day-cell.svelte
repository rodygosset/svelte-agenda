<script lang="ts">

    export let date: Date = null;


    $: day = date?.getDate();

    const getClassNames = () => {
        const classNames = ["container"];

        if(day) classNames.push("has-day");

        return classNames.join(" ");
    }

</script>


<style lang="scss">

    @import "../../styles/base/mixins.scss";
    @import "../../styles/abstracts/_colors.scss";
    @import "../../styles/base/_typography.scss";

    .container {

        @include flex-container(row, nowrap, center, center);
        width: 110px;
        height: 110px;

        border: 1px solid $white-100;

        transition: all ease-in-out 0.2s;

        p {
            @include header-2-regular;
            color: $white;
        }

        &.has-day {
            
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
    {/if}

</li>
