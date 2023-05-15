<script lang="ts">


    export let value: string = '#FFFFFF'
    export let name: string = ""

</script>


<style lang="scss">

    @import '../../styles/base/_reset.scss';

    input {

        @include reset-form-input;

        &[type="color"] {

            width: 40px;
            height: 40px;
            flex-shrink: 0;
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

</style>

<input type="color" bind:value style="background: {value};" name="{name}" />