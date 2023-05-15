<script lang="ts">
    import { format24H } from "../../utils";

    
    export let value: string = format24H(new Date())
    export let required: boolean = false
    export let name: string = ""

</script>


<style lang="scss">

    @import "../../styles/base/_reset.scss";
    @import '../../styles/abstracts/_colors.scss';
    @import '../../styles/base/_typography.scss';
    @import '../../styles/base/_mixins.scss';

    input {
        @include reset-form-input;
        @include flex-container(row, nowrap, flex-start, center);
        @include text-md-regular;
        
        background: $white-100;
        color: $white;
        padding: 16px;

    }

</style>

<!-- for accessibility purposes -->
<input type="time" bind:value required={required} name="{name}" />


