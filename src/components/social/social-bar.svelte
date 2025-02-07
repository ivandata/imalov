<script lang="ts">
  import GitHubIcon from './github.svelte'
  import DevDotToIcon from './dev-dot-to.svelte'
  import LinkedinIcon from './linkedin.svelte'

  let social = {
    linkedin: {
      icon: LinkedinIcon,
      url: "https://www.linkedin.com/in/ivan-malov/",
      alt: "Ivan Malov's LinkedIn profile"
    },
    github: {
      icon: GitHubIcon,
      url: "https://github.com/ivandata/",
      alt: "Ivan Malov's GitHub profile"
    },
    devto: {
      icon: DevDotToIcon,
      url: "https://dev.to/imalov",
      alt: "Ivan Malov's dev.to profile"
    }
  }
</script>

<ul class="social">
  {#each Object.values(social) as { icon, url, alt }}
    <li>
      <a href={url}>
        <span class="icon">
         <svelte:component this={icon} />
        </span>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
:global {
  .social {
    display: flex;
    margin-right: auto;
    margin-left: var(--spacing-layout-06);

    a {
      display: inline-block;
      position: relative;
      height: var(--spacing-content-05);
      width: var(--spacing-content-05);
      margin-right: var(--spacing-content-05);

      svg {
        fill: var(--color-text-primary);
        width: 100%;
        height: 100%;

        &:hover {
          fill: var(--color-interactive-primary-hover);
        }
      }
    }
  }
}
</style>