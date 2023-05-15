<script lang="ts">

	import "@fontsource/raleway"
	import Header from "./components/layout/header.svelte";
    import DayCell from "./components/calendar/day-cell.svelte";
    import { currentMonth, getDatesInCurrentMonth } from "./stores/current-month-store";
    import DayView from "./components/calendar/day-view.svelte";

	const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


	// rendering strategy:
	// 1. get the first day of the current month, and start rendering from here
	// 2. if it's anything but a monday, render the previous days of the week, as empty cells
	// 3. keep rendering until the end of the month
	// 4. if the last day of the month is not a sunday, render the next days of the week, as empty cells
	// Important: use a grid with a width of 7 columns that automatically wraps the content

	// ==> the getDatesInCurrentMonth function takes care of this logic


	$: datesInMonth = getDatesInCurrentMonth($currentMonth)
	let showModal = false;
	let selectedDate = null;

</script>

<style lang="scss">

	@import "./styles/base/_reset.scss";
	@import "./styles/base/_mixins.scss";
	@import "./styles/base/_typography.scss";
	@import "./styles/abstracts/_colors.scss";

	main {
		@include flex-container(column, nowrap, flex-start, center);

		ul {

			@include reset-list;
			@include flex-container(row, nowrap, flex-start, stretch);

			&.week-days {
				
				li {
					@include header-4-regular;
					@include flex-container(row, nowrap, center, center);
					width: 110px;
					color: rgba($white, 0.8);
					padding: 20px 0;
				}
			}

			&.calendar {
				display: grid;
                grid-template-columns: repeat(7, 110px);
                grid-auto-rows: minmax(min-content, max-content);
                justify-items: start;
                align-items: start;
			}
		}
	}
</style>

<Header />

<main>

	<ul class="week-days">
		{#each weekDays as day}
			<li>{day}</li>
		{/each}
	</ul>

	<!-- for each day of the week, render a DayCell component -->

	<ul class="calendar">
		{#each datesInMonth as day}
			<DayCell date={day} on:click={() => {showModal = true; selectedDate = day}} />
		{/each}
	</ul>

</main>

<DayView isVisible={showModal} closeModal={() => showModal = false} day={selectedDate} />