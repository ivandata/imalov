<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Button from "./ui/button.svelte";
  import themes from "../styles/theme/themes.json";

  let theme = writable(0);
  let isMenuOpened = writable(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const changeTheme = (th: string) => {
    const index = themes.themes.indexOf(th);
    theme.set(index);
    localStorage.theme = index.toString();
  };

  const closeMenuByTimeout = () => {
    isMenuOpened.update(value => {
      if (!value) return value;
      timeoutId = setTimeout(() => toggleMenu(), 1000);
      return value;
    });
  };

  const preventCloseMenu = () => {
    if (!timeoutId) return;
    clearTimeout(timeoutId);
  };

  const toggleMenu = () => {
    isMenuOpened.update(value => !value);
  };

  onMount(() => {
    const storedTheme = localStorage.theme;
    if (storedTheme) {
      theme.set(Number(storedTheme));
    } else {
      const osDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (osDarkScheme.matches && themes.themes.includes("dark")) {
        theme.set(themes.themes.indexOf("dark"));
      }
    }

    document.addEventListener("scroll", () => {
      isMenuOpened.update(value => (window.scrollY > 1000 && value ? !value : value));
    });
  });
</script>

<div class="container" on:mouseleave={closeMenuByTimeout} on:mouseenter={preventCloseMenu}>
  <div class="menu">
    <Button
      class="trigger {isMenuOpened ? 'opened' : ''}"
      aria-label="Show site schemes"
      title="Show site schemes"
      on:click={toggleMenu}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    </Button>
    {#each themes.themes as th}
      <Button
        class="theme {th} {(isMenuOpened ? 'opened' : '')}"
        tabindex={isMenuOpened ? 0 : -1}
        aria-label={`Select site scheme to ${th}`}
        title={`Select site scheme to ${th}`}
        on:click={() => changeTheme(th)}
      />
    {/each}
  </div>
</div>

<style>
  .container {
    border: 0;
    padding: 0;
    margin: 0;
    z-index: 5000;
    width: 100%;
    height: 100%;
  }

  .theme {
    position: absolute;
    transform: translate3d(0, 0, 0);
    transition: transform ease-out 200ms;
    padding: var(--spacing-content-03);
    right: 2px;
    box-shadow: none;
  }

  .theme::before {
    border-radius: var(--border-radius-xl);
    border-width: 10px;
    border-style: solid;
    transform: rotate(-135deg);
    content: '';
    position: relative;
  }

  .theme.classic::before {
    border-color: #13399C #13399C #ffffff #ffffff;
  }

  .theme.dark::before {
    border-color: #071108 #071108 #7828C8 #7828C8;
  }

  .theme.light::before {
    border-color: #f9f8f6 #f9f8f6 #d3f0ff #d3f0ff;
  }

  .theme.opened {
    transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);
  }

  .menu {
    filter: url('#shadowed');
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }

  .trigger {
    z-index: 10;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275);
    transition-duration: 400ms;
    transform: scale(1, 1) translate3d(0, 0, 0);
    box-shadow: none;
  }

  .trigger.opened {
    transition-timing-function: linear;
    transition-duration: 200ms;
    transform: scale(0.8, 0.8) translate3d(0, 0, 0);
  }
</style>
