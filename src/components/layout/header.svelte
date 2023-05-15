<script lang="ts">

    import Logo from "/svelte-agenda-icon.svg";
    import MonthNavButton from "./month-nav-button.svelte";
    import { currentMonth } from "../../stores/current-month-store";

    $: month = $currentMonth.toLocaleDateString("default", { month: "long" });
    $: year = $currentMonth.getFullYear();

</script>

<style lang="scss">

    @import "../../styles/base/mixins.scss";
    @import "../../styles/abstracts/_colors.scss";
    @import "../../styles/base/_typography.scss";

    header {

        @include flex-container(row, nowrap, space-between, center);
        width: 100%;
        position: sticky;
        top: 0;
        left: 0;

        gap: 64px;

        background: $black-100;
        backdrop-filter: blur(40px);

        padding: 16px 10vw;

        .container {
            @include flex-container(row, nowrap, flex-start, center);
            gap: 32px;

            .current-month {
                @include flex-container(row, nowrap, center, center);
                gap: 16px;

                .month {
                    @include header-2-regular;
                    color: $white;
                }

                .year {
                    @include header-2-regular;
                    color: $white-600;
                }
            }
        }

        .brand {
            @extend .container;

            h1 {
                @include header-3-regular;
            }
        }

    }

</style>

<header>

    <div class="brand">
        <img src="{Logo}" width="80px" height="80px" alt="Logo" />
        <h1>SVELTE AGENDA</h1>
    </div>

    <div class="container">
        <MonthNavButton />
        <p class="current-month">
            <span class="month">{month}</span>
            <span class="year">{year}</span>
        </p>
        <MonthNavButton forward />
    </div>

</header>