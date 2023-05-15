import { writable } from 'svelte/store'


const today = new Date()

// Set the current month to the first day of the current month

export const currentMonth = writable<Date>(new Date(today.getFullYear(), today.getMonth(), 1))

/**
 * Set the date back a month
 */

export const previousMonth = () => {
    currentMonth.update(date => {
        date.setMonth(date.getMonth() - 1)
        return date
    })
}

/**
 * Set the date forward a month
 */

export const nextMonth = () => {
    currentMonth.update(date => {
        date.setMonth(date.getMonth() + 1)
        return date
    })
}


/**
 * Get the dates for the current month
 * @param currentMonth The current month
 * @returns An array of dates for the current month
 */

export const getDatesInCurrentMonth = (currentMonth: Date) => {
    const dates: Date[] = []
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const firstDayIndex = firstDay.getDay()
    const lastDayIndex = lastDay.getDay()
    const nextDays = 7 - lastDayIndex - 1

    // add the previous days of the week, if the first day of the month is not a monday

    for (let i = firstDayIndex; i > 0; i--) {
        dates.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
        // add the current date to the list
        dates.push(new Date(year, month, i))
    }

    // add the next days of the week, if the last day of the month is not a sunday

    for (let i = 1; i <= nextDays; i++) {
        dates.push(null)
    }

    return dates
}