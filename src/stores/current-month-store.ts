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
 * Get the number of days in a month
 * @param date The date to get the days in the month for
 * @returns The number of days in the month
 */

export const daysInCurrentMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()