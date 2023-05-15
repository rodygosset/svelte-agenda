

/**
     * Format the date to AM/PM
     * @param date The date to format
     * @returns The formatted date
     */

export const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours || 12;

    let minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutesStr + ' ' + ampm;
}

/** 
 * Format a date to 24H format
 * @param date The date to format
 * @returns The formatted date string
 */

export const format24H = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutesStr;
}