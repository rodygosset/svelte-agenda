<script lang="ts">

    // props

    export let icon: string

    export let size: number = 2

    export let color: string = "white"


    const getClassNames = () => ["fa-solid", icon].join(' ')

    const getStyles = () => "font-size: " + size + "rem; color: " + color + ";"

</script>

<i 
    class="{getClassNames()}"
    style="{getStyles()}">
</i>
