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

// export const events = writable<AgendaEvent[]>(initialValue)

const createEventStore = () => {

    const { subscribe, update } = writable<AgendaEvent[]>(initialValue)

    return {
        subscribe,
        /**
         * Add an event to the store and update local storage
         * @param newEvent the event to add
         * @returns nothing
         */
        addEvent: (newEvent: AgendaEvent) => update(currentEvents => {
            const newEvents = [...currentEvents, newEvent]
            localStorage.setItem('events', JSON.stringify(newEvents))
            return newEvents
        }),
        /**
         * Update an event in the store and update local storage
         * @param currentEvents the list of events in the store
         * @param event the event to update
         * @returns nothing
         */
        updateEvent: (event: AgendaEvent) => update(currentEvents => {

            // find the index of the event in the array
            const index = currentEvents.findIndex(e => e.title === event.title)


            if (index === -1) return currentEvents

            // create a new array with the updated event

            let newEventsList = [...currentEvents]
            newEventsList[index] = event

            // update the store and local storage

            localStorage.setItem('events', JSON.stringify(newEventsList))
            return newEventsList
        }),
        /**
         * Delete an event from the store
         * @param currentEvents the list of events in the store
         * @param event the event to delete
         * @returns nothing
         */
        deleteEvent: (event: AgendaEvent) => update(currentEvents => {
                
                // find the index of the event in the array
                const index = currentEvents.findIndex(e => e.title === event.title)
    
                if (index === -1) return currentEvents
    
                // create a new array without the event
    
                let newEventsList = [...currentEvents]
    
                // use the splice method to remove the event from the array
                newEventsList.splice(index, 1)
    
                // update the store and local storage
    
                localStorage.setItem('events', JSON.stringify(newEventsList))
                return newEventsList
        })
    }

}

export const events = createEventStore()