<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Button from './ui/button.svelte';

  let isVisible = writable(false);
  const title = 'Back to top';

  const handleScroll = () => {
    isVisible.set(window.scrollY > window.innerHeight - 100);
  };

  const scrollToTop = (event: Event) => {
    document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
    (event.target as HTMLElement).blur();
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<Button
  onButtonPress={scrollToTop}
  className="fixed {$isVisible ? 'is-visible' : ''}"
  aria-label={title}
  title={title}
>
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
  </svg>
</Button>

<style lang="scss">
  @use '../styles/scss/mixins/motion' as motion;

  :global {
    .button.fixed {
      position: fixed;
      margin: 0;
      opacity: 0;
      z-index: 5000;
      bottom: calc(-1 * var(--spacing-layout-06));
      right: var(--spacing-layout-02);
      transition:
        bottom (motion.$duration-moderate-long + ms) motion.getMotion('standard', 'basic'),
        opacity (motion.$duration-moderate-long + ms) motion.getMotion('standard', 'basic'),
        box-shadow (motion.$duration-moderate-long + ms) motion.getMotion('standard', 'basic');
    }

    .fixed.is-visible {
      opacity: 1;
      bottom: var(--spacing-layout-06);
    }

    @media (min-width: 768px) {
      .fixed {
        right: var(--spacing-layout-04);
      }
    }

    @media (min-width: 1024px) {
      .fixed {
        right: var(--spacing-layout-05);
      }
    }
  }
</style>


