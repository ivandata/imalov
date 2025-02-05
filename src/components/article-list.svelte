<script lang="ts">
  import ArticleItem from './article-item.svelte';
  export let articles: { id: string; title: string; content: string }[];
  export let title: string;
</script>

<section class="list">
  <header>
    <h3>{title}</h3>
  </header>
  {#each articles as article}
    <ArticleItem article={article.frontmatter} />
  {/each}
</section>

<style lang="scss">
  .list {
    margin-top: var(--spacing-layout-05);
  }
</style>
