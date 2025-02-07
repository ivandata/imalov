import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import sitemap from '@astrojs/sitemap';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.timeToRead = readingTime.text;
  };
}

export default defineConfig({
  integrations: [svelte(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'prism',
  },
  experimental: {
    svg: true,
  },
  site: 'https://imalov.dev',
  author: 'Ivan Malov <hello@imalov.dev> (imalov)'
});