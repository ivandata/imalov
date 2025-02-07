import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.timeToRead = readingTime.text;
  };
}

export default defineConfig({
  integrations: [svelte()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'prism',
  },
  experimental: {
    svg: true,
  },
});