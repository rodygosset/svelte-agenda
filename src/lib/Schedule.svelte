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

let nouveauTitreEvenement = '';
let nouvelleDateEvenement = '';

let evenementSelectionne: Event | null = null;
let titreEvenementSelectionne = '';
let dateEvenementSelectionne = '';

function ajouterEvenement() {
    const nouvelEvenement: Event = {
        title: nouveauTitreEvenement,
        date: nouvelleDateEvenement
    };

    events.update(evenementsActuels => [...evenementsActuels, nouvelEvenement]);

    nouveauTitreEvenement = '';
    nouvelleDateEvenement = '';
}

function modifierEvenement() {
    if (!evenementSelectionne) return;

    const evenementsActuels = getEvents();
    const index = evenementsActuels.findIndex(e => e === evenementSelectionne);

    if (index === -1) return;

    const eventsUpdate = [
        ...evenementsActuels.slice(0, index),
        {
            title: titreEvenementSelectionne,
            date: dateEvenementSelectionne
        },
        ...evenementsActuels.slice(index + 1)
    ];

    events.update(() => eventsUpdate);

    localStorage.setItem('events', JSON.stringify(eventsUpdate));

    evenementSelectionne = null;
    titreEvenementSelectionne = '';
    dateEvenementSelectionne = '';
}

function selectionnerEvenement(event: Event) {
    evenementSelectionne = event;
    titreEvenementSelectionne = event.title;
    dateEvenementSelectionne = event.date;
}

function getEvents(): Event[] {
    let currentEvents: Event[];

    events.subscribe((value: Event[]) => {
        currentEvents = value;
    })();

    return currentEvents;
}

</script>

<main>
    <form on:submit|preventDefault={ajouterEvenement}>
        <input type="text" bind:value={nouveauTitreEvenement} placeholder="Titre de l'événement" required />
        <input type="datetime-local" bind:value={nouvelleDateEvenement} required />
        <button type="submit">Ajouter un événement</button>
    </form>

    {#if evenementSelectionne}
        <form on:submit|preventDefault={modifierEvenement}>
            <input type="text" bind:value={titreEvenementSelectionne} placeholder="Titre de l'événement" required />
            <input type="datetime-local" bind:value={dateEvenementSelectionne} required />
            <button type="submit">Modifier l'événement</button>
            <button type="button" on:click={() => evenementSelectionne = null}>Annuler</button>
        </form>
    {/if}

    <div>
        {#each $events as event (event.date)}
            <div on:click={() => selectionnerEvenement(event)}>
                <h2>{event.title}</h2>
                <p>{event.date}</p>
            </div>
        {/each}
    </div>
</main>