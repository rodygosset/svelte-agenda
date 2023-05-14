<script lang="ts">
import { writable } from 'svelte/store';

interface Event {
    title: string;
    date: string;
}

const events = (() => {
    const initialValue: Event[] = JSON.parse(localStorage.getItem('events') || '[]');
    const store = writable(initialValue);

    store.subscribe((value) => {
        localStorage.setItem('events', JSON.stringify(value));
    });

    return store;
})();

function getEvents(): Event[] {
    let currentEvents: Event[];

    events.subscribe((value: Event[]) => {
        currentEvents = value;
    })();

    return currentEvents;
}
</script>
