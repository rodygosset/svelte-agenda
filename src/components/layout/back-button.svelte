<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import FontAwesomeIcon from "../font-awesome-icon.svelte";

    const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click', {})
	}

</script>

<style lang="scss">
    
    @import "../../styles/base/_reset.scss";
    @import "../../styles/base/mixins.scss";
    @import "../../styles/abstracts/_colors.scss";

    button {
        @include reset-button;
        @include flex-container(row, nowrap, center, center);
        width: 60px;
        height: 60px;

        border: 1px solid $white-100;
        border-radius: 30px;

        &:hover {
            background-color: $white-100;
            cursor: pointer;
        }
    }

    i {
        color: $white;
        font-size: 2rem;
    }
</style>


<button on:click={handleClick} on:keypress={() => {}}>
    <FontAwesomeIcon icon="fa-chevron-left" />
</button>