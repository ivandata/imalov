<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import Button from "./ui/button.svelte";
  import themesJson from "../styles/theme/themes.json";

  const THEMES = {
    Dark: "dark",
    Light: "light",
    Classic: "classic"
  } as const;

  const themes: string[] = themesJson.themes;

  let theme = writable<number>(0);
  let isMenuOpened = writable<boolean>(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  /** Change theme and store in localStorage */
  const onThemeChange = (themeName: string): void => {
    const index = themes.indexOf(themeName);
    if (index !== -1) {
      theme.set(index);
      localStorage.setItem("theme", index.toString());
      updateBodyTheme(index);
    }
  };

  /** Closes the menu after a timeout */
  const closeMenuByTimeout = (): void => {
    isMenuOpened.update((value) => {
      if (!value) return value;
      timeoutId = setTimeout(() => onMenuToggle(), 1000);
      return value;
    });
  };

  /** Prevents menu from closing */
  const preventCloseMenu = (): void => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  /** Toggles the menu state */
  const onMenuToggle = (): void => {
    isMenuOpened.update((value) => !value);
  };

  /** Updates `data-theme` on the document body */
  const updateBodyTheme = (themeIndex: number): void => {
    const themeName = themes[themeIndex];
    if (themeName) document.body.setAttribute("data-theme", themeName);
  };

  /** Initializes theme preference */
  const initializeTheme = (): void => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      theme.set(Number(storedTheme));
    } else {
      const osDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (osDarkScheme.matches && themes.includes(THEMES.Dark)) {
        theme.set(themes.indexOf(THEMES.Dark));
      } else if (themes.includes(THEMES.Light)) {
        theme.set(themes.indexOf(THEMES.Light));
      }

      // Handle OS preference change
      const handleColorSchemeChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          if (e.matches && themes.includes(THEMES.Dark)) {
            theme.set(themes.indexOf(THEMES.Dark));
          } else if (themes.includes(THEMES.Light)) {
            theme.set(themes.indexOf(THEMES.Light));
          }
        }
      };
      osDarkScheme.addEventListener("change", handleColorSchemeChange);

      onDestroy(() => {
        osDarkScheme.removeEventListener("change", handleColorSchemeChange);
      });
    }
  };

  onMount(() => {
    initializeTheme();

    // Update document body when theme store changes
    const unsubscribeTheme = theme.subscribe(updateBodyTheme);

    // Listen for localStorage changes (from other tabs)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme" && event.newValue) {
        theme.set(Number(event.newValue));
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      unsubscribeTheme();
      window.removeEventListener("storage", handleStorage);
    };
  });
</script>

<!-- Component HTML -->
<div class="container" onMouseEnter={preventCloseMenu} onMouseLeave={closeMenuByTimeout}>
  <div class="menu">
    <Button
      className="trigger {$isMenuOpened ? 'opened' : ''}"
      aria-label="Show site schemes"
      title="Show site schemes"
      onButtonPress={onMenuToggle}
      onMouseLeave={closeMenuByTimeout}
      onMouseEnter={preventCloseMenu}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
      </svg>
    </Button>

    {#each themes as th}
      <Button
        className="theme {th} {$isMenuOpened ? 'opened' : ''}"
        tabindex={$isMenuOpened ? 0 : -1}
        aria-label={`Select site scheme to ${th}`}
        title={`Select site scheme to ${th}`}
        onButtonPress={() => onThemeChange(th)}
        onMouseLeave={closeMenuByTimeout}
        onMouseEnter={preventCloseMenu}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  @use '../styles/scss/mixins/motion' as motion;

  :global {
    $themes: 4;

    .theme {
      position: absolute;
      transform: translate3d(0, 0, 0);
      transition: transform (motion.$duration-moderate-short + ms) motion.getMotion(standard, basic);
      padding: var(--spacing-content-03);
      right: 2px;
      box-shadow: none;

      &:before {
        border-radius: var(--border-radius-xl);
        border-width: 10px 10px 10px 10px;
        border-style: solid;
        transform: rotate(-135deg);
        content: '';
        position: relative;
      }

      &.classic:before {
        border-color: #13399C #13399C #ffffff #ffffff;
      }

      &.dark:before {
        border-color: #071108 #071108 #7828C8 #7828C8;
      }

      &.light:before {
        border-color: #f9f8f6 #f9f8f6 #d3f0ff #d3f0ff;
      }

      @for $i from 1 through $themes {
        &:nth-child(#{$i+2}) {
          transition-duration: motion.$duration-fast-short + ms;
          z-index: $i;
        }
      }

      &.opened {
        transition-timing-function: cubic-bezier(0.165, 0.840, 0.440, 1.000);

        @for $i from 1 through $themes {
          &:nth-child(#{$i+1}) {
            transition-duration: motion.$duration-fast-short + (100ms*$i);
            transform: translate3d((-65px*$i), 0, 0);
          }
        }
      }

      &.button {
        position: absolute;
        transform: translate3d(0, 0, 0);
        transition: transform (motion.$duration-moderate-short + ms) motion.getMotion(standard, basic);
        padding: var(--spacing-content-03);
        right: 2px;
        box-shadow: none;

        &:before {
          border-radius: var(--border-radius-xl);
          border-width: 10px;
          border-style: solid;
          transform: rotate(-135deg);
          content: '';
          position: relative;
        }
      }
    }

    .container {
      border: 0;
      padding: 0;
      margin: 0;
      z-index: 5000;
      width: 100%;
      height: 100%;
    }

    .menu {
      filter: url('#shadowed');
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
    }

    .button.trigger {
      z-index: 10;
      transition: transform (motion.$duration-moderate-short + ms) motion.getMotion(entrance, basic);
      transform: scale(1, 1) translate3d(0, 0, 0);
      box-shadow: none;
    }

    .trigger.opened {
      transition: transform (motion.$duration-moderate-short + ms) motion.getMotion(exit, basic);
      transform: scale(0.8, 0.8) translate3d(0, 0, 0);
    }
  }
</style>
