<script lang="ts">
  export let article: { title: string; path: string; date: string; description: string };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-us", { month: "long" });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  }
</script>

<article class="item">
  <h4>
    <a class="link" href={article.path}>{article.title}</a>
  </h4>
  <time class="date">{formatDate(article.date)}</time>
  <p>{article.description}</p>
</article>

<style lang="scss">
  @use "../styles/scss/mixins/index.scss" as mixins;

  .item {
    .header {
      display: flex;
      align-items: baseline;
    }

    .date {
      grid-area: info;
      display: inline-block;
      align-self: self-end;
      margin-right: var(--spacing-content-03);
      color: var(--color-text-secondary);
      @include mixins.font-mono();
    }

    h3 {
      grid-area: header;
      margin: 0;

      .link {
        text-decoration: none;
      }
    }

    h4 {
      margin-bottom: 0;
    }

    p {
      grid-area: content;
    }
  }
</style>