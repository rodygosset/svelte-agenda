<script lang="ts">

    export let value: string = ''
    export let placeholder: string = ''
    export let required: boolean = false
    export let fullWidth: boolean = false
    export let name: string = "" 

</script>


<style lang="scss">

    @import '../../styles/base/_reset.scss';
    @import '../../styles/abstracts/_colors.scss';
    @import '../../styles/base/_typography.scss';
    @import '../../styles/base/_mixins.scss';

    input {
        @include reset-form-input;
        @include text-md-regular;

        width: 200px;
        color: $white;

        background: $white-100;
    
        padding: 16px;

        &::placeholder {
            /* Chrome, Firefox, and newer versions of Opera */
            color: $white-400;
            opacity: 1; /* Firefox needs this to display the color */
        }

        &.fullWidth {
            width: 100%;
        }

    }

</style>


<input type="text" class:fullWidth={fullWidth} bind:value placeholder={placeholder} required={required} name="{name}" />
