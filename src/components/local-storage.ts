// localStorageStore.js
import { writable } from 'svelte/store';

export function localStorageStore(key, initialValue) {
  const storedValue = localStorage.getItem(key);
  const data = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable(data);

  // Subscribe to changes and update localStorage
  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}