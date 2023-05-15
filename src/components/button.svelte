<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import FontAwesomeIcon from "./font-awesome-icon.svelte";


    const dispatch = createEventDispatcher();

    const handleClick = () => {
        dispatch('click', {})
    } 

    export let role: "primary" | "secondary" | "tertiary" = "primary"
    export let type: "button" | "submit" | "reset" = "button"
    export let icon: string = null

    export let fullWidth: boolean = false


</script>

<style lang="scss">

    @import "../styles/base/_reset.scss";
    @import "../styles/abstracts/_colors.scss";
    @import "../styles/base/_typography.scss";
    @import "../styles/base/_mixins.scss";

    button {
        @include reset-button;
        @include text-md-regular;
        @include flex-container(row, nowrap, center, center);
        padding: 16px;
        gap: 8px;

        color: $white;

        i {
            @include text-md-regular;
            width: 20px;
            height: 20px;
            color: $white;
        }


        transition: all 0.2s ease-in-out;

        &:hover {
            cursor: pointer;
        }

        &.primary {
            background: $primary;

            &:hover {
                box-shadow: 0px 15px 60px $primary-200;
            }
        }

        &.secondary {
            background: $white-100;
            border: 1px solid transparent;

            &:hover {    
                border-color: $white;
                box-shadow: 0px 15px 45px $white-100;
            }
        }

        &.tertiary {
            background: $black;
            border: 1px solid $white-100;

            &:hover {
                background: $white-100;
            }
        }

        &.fullWidth {
            width: 100%;
        }
    }

</style>

<button 
    class="{role}"
    class:fullWidth={fullWidth}
    type="{type}"
    on:click={handleClick}>
    {#if icon}
        <FontAwesomeIcon icon={icon} />
    {/if}
    <slot />
</button>