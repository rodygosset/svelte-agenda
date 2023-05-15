<script lang="ts">

	import "@fontsource/raleway"
	import Header from "./components/layout/header.svelte";
    import DayCell from "./components/calendar/day-cell.svelte";
    import { currentMonth } from "./stores/current-month-store";

	const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	const getDatesInCurrentMonth = (currentMonth: Date) => {
		const dates: Date[] = [];
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const firstDayIndex = firstDay.getDay();
		const lastDayIndex = lastDay.getDay();
		const nextDays = 7 - lastDayIndex - 1;

		for (let i = firstDayIndex; i > 0; i--) {
			dates.push(undefined);
		}

		for (let i = 1; i <= daysInMonth; i++) {
			// add the current date to the list
			dates.push(new Date(year, month, i));
		}

		for (let i = 1; i <= nextDays; i++) {
			dates.push(undefined);
		}

		return dates;
	}

	$: datesInMonth = getDatesInCurrentMonth($currentMonth)


	// rendering strategy:
	// 1. get the first day of the current month, and start rendering from here
	// 2. if it's anything but a monday, render the previous days of the week, as empty cells
	// 3. keep rendering until the end of the month
	// 4. if the last day of the month is not a sunday, render the next days of the week, as empty cells
	// Important: use a grid with a width of 7 columns, and a height of 6 rows, that automatically wraps the content


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
			<DayCell date={day} />
		{/each}
	</ul>


</main>