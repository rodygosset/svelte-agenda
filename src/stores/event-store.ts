import { writable } from 'svelte/store'

export interface AgendaEvent {
    title: string;
    start: Date;
    end: Date;
    color: string;
    description: string;
}

// events store


// get events from local storage or set an empty array

const initialValue: AgendaEvent[] = JSON.parse(localStorage.getItem('events') || '[]')

// create a writable store with the initial value

export const events = writable<AgendaEvent[]>(initialValue)


/**
 * Add an event to the store
 * @param newEvent the event to add
 * @returns nothing
 */

export const addEvent = (newEvent: AgendaEvent) => {
    events.update(currentEvents => [...currentEvents, newEvent])
}



/**
 * Update an event in the store
 * @param currentEvents the list of events in the store
 * @param event the event to update
 * @returns nothing
 */

export const updateEvent = (currentEvents: AgendaEvent[], event: AgendaEvent) => {

    // find the index of the event in the array

    const index = currentEvents.findIndex(e => e.title === event.title)

    if (index === -1) return

    // create a new array with the updated event

    let newEventsList = [...currentEvents]

    newEventsList[index] = event

    // update the store and local storage

    events.update(() => newEventsList)

    localStorage.setItem('events', JSON.stringify(newEventsList))
}


/**
 * Delete an event from the store
 * @param currentEvents the list of events in the store
 * @param event the event to delete
 * @returns nothing
 */

export const deleteEvent = (currentEvents: AgendaEvent[], event: AgendaEvent) => {

    // find the index of the event in the array
    const index = currentEvents.findIndex(e => e.title === event.title)

    if (index === -1) return

    // create a new array without the event

    let newEventsList = [...currentEvents]

    // use the splice method to remove the event from the array
    newEventsList.splice(index, 1)

    // update the store and local storage

    events.update(() => newEventsList)

    localStorage.setItem('events', JSON.stringify(newEventsList))

}

