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
  
  function ajouterEvenement() {
      const nouvelEvenement: Event = {
          title: nouveauTitreEvenement,
          date: nouvelleDateEvenement
      };
  
      events.update(evenementsActuels => [...evenementsActuels, nouvelEvenement]);
  
      nouveauTitreEvenement = '';
      nouvelleDateEvenement = '';
  }
  </script>
  
  <main>
      <form on:submit|preventDefault={ajouterEvenement}>
          <input type="text" bind:value={nouveauTitreEvenement} placeholder="Titre de l'événement" required />
          <input type="datetime-local" bind:value={nouvelleDateEvenement} required />
          <button type="submit">Ajouter un événement</button>
      </form>
  
      <div>
          {#each $events as event (event.date)}
              <div>
                  <h2>{event.title}</h2>
                  <p>{event.date}</p>
              </div>
          {/each}
      </div>
  </main>
