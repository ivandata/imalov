---
layout: ../../layouts/article.astro
title: "Another way to create themes"
description: "How to write first tokens from scratch, generate themes from them, automate this process and further scale them."
keywords: "Amazon Style Dictionary, tokens, css variables, design systems, create custom site theme, theme create site, site color theme, site change theme wordpress, website color theme, site dark theme, site design theme, theme site definition, site default theme, e commerce site themes, vue, vue-cli"
date: 2020-06-05
---

Recently, I have been developing design systems. It's no secret that creating themes is not possible without the specified variables. Variables in styles has long been used by libraries like Bootsrtap or Foundation. Design systems has gone much further and uses tokens to encode values. Tokens are used in components, colors, and typographic documentation. Without tokens, scaling any system becomes a very difficult task. Right written token system allows all team members to speak the same language also.

Getting started using tokens is not as difficult as it seems. You can start encoding with the site color palette. There are many resources that allow you to extract all colors from any site to analyze them, sort them, and encode palette into tokens. In this article, I will tell you how to write your first tokens from scratch, generate themes from them, automate the process and further scale them. I want to share my experience of writing themes and generating them, based on my experience that I gained when creating design systems.

For a quick start we will use **@vue/cli**, but you can choose another framework or pure javascript if you want. For build tokens we take [Style Dictionary](https://amzn.github.io/style-dictionary/) — great build system from Amazon, which help you to define styles once, in a way for any platform or language to consume like, IOS, Android, Web, e.t.c.

But let's first figure out what a token is? A token is a named entity that stores a visual design attribute. They are used instead of hard-coded values (such as HEX values for color or pixel values for interval) to support a scalable and consistent visual system for user interface. Nathan Curtis wrote a great [article about tokens](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421).

We will describe tokens in JSON file and generate SCSS maps from them. When SCSS variables in turn will be generated in CSS variables for each theme. You may ask what the point of this? Why not use CSS variables immediately? Well we will still use CSS variables in our CSS, but the preprocessor has great functions and language constructs, it helps keep clean our source styles and allow to generate CSS code using loops for example.

## Tokens, tokens, tokens...

I'll show you [result](https://ivandata.github.io/another-way-to-create-themes/) and [code](https://github.com/ivandata/another-way-to-create-themes) what we should get. You should already have **@vue/cli** installed and **Node.js**. If not, then it's time to do it. I hope to create a new project is also not problem for you, just use **@vue/cli** commands to do that. Then we will install the necessary dependencies and launch our project:

```bash
npm i sass-loader sass style-dictionary -D && npm run serve
```

Great! Do not change this template, let's deal with tokens. Since this article is an example, we will not to go deep into tokens for sizes and properties in details. Instead that, we will specify color tokens for links and typography. The structure of our token folder will be as follows:
<pre>
.
└── *src* root source folder
    └── *lib* folder for our token library
        ├── *themes* themes tokens
        ├── *properties* properties tokens
        └── *dist* generated files. Add this folder to `.gitignore` file;
</pre>
Create the folders:

```bash
mkdir src/lib/tokens/themes && mkdir src/lib/tokens/properties
```

And create our first *default* theme in the */tokens/themes* folder, containing 4 JSON files:

```json
// background.json — background tokens
{
  "color": {
    "background": {
      "page": {
        "primary": {
          "value": "#f9f8f6"
        },
        "secondary": {
          "value": "#FFFFFF"
        }
      },
      "container": {
        "primary": {
          "value": "#FFFFFF"
        },
        "secondary": {
          "value": "#f9f8f6"
        }
      }
    }
  }
}

// interactive.json — tokens for interactive elements like buttons or navigations for example.
{
  "color": {
    "interactive": {
      "default": {
        "value": "#0c7aff"
      },
      "hover": {
        "value": "#005dcb"
      },
      "focus": {
        "value": "#00479b"
      },
      "active": {
        "value": "#00479b"
      },
      "above": {
        "value": "#ffffff"
      }
    }
  }
}

// link.json — Tokens for links
{
  "color": {
    "link": {
      "default": {
        "value": "#0c7aff"
      },
      "hover": {
        "value": "#063e7e"
      },
      "visited": {
        "value": "#5b08a3"
      }
    }
  }
}

// text.json — Text color tokens
{
  "color": {
    "text": {
      "primary": {
        "value": "#000000"
      },
      "inverse": {
        "value": "#ffffff"
      }
    }
  }
}
```

You should pay attention here to nesting structures. Style Dictionary does a deep merge of all the property JSON files to key: value token pairs. This allows you to split up the property JSON files however you want. For example, a text.json file will be generated into two tokens:

```scss
$color-text-primary: #000000;
$color-text-inverse: #ffffff;
```

Token names are very important and it is important to follow three basic rules when naming them:

1. The beginning of the name should describe the variant. Font for a font, color for a color for example;
2. Next, we describe the context to which the token is applied. The context can be inherited. Background for the color variant for example;
3. The last is a parameter. You can use a geometric progression for dimensions (2, 4, 8, 16, 32, 64) or sizes in t-shirts (XS, S, M, L, XL, XXL). For states you can use the usual values like hover, focus, or the characteristics of primary, secondary;

And the same for property tokens and sizes in the */tokens/properties* folder:

```json
// border.json tokens borders
{
  "border": {
    "element": {
      "01": {
        "value": "1px solid"
      },
      "02": {
        "value": "2px solid"
      }
    },
    "radius": {
      "s": {
        "value": "6px"
      },
      "m": {
        "value": "10px"
      },
      "l": {
        "value": "14px"
      }
    }
  }
}
// spacing.json token for indents at page layout and components
{
  "spacing": {
    "layout": {
      "01": {
        "value": "1rem"
      },
      "02": {
        "value": "1.5rem"
      },
      "03": {
        "value": "2rem"
      },
      "04": {
        "value": "3rem"
      },
      "05": {
        "value": "4rem"
      },
      "06": {
        "value": "6rem"
      },
      "07": {
        "value": "10rem"
      }
    },
    "content": {
      "01": {
        "value": "0.125rem"
      },
      "02": {
        "value": "0.25rem"
      },
      "03": {
        "value": "0.5rem"
      },
      "04": {
        "value": "0.75rem"
      },
      "05": {
        "value": "1rem"
      },
      "06": {
        "value": "1.5rem"
      },
      "07": {
        "value": "2rem"
      },
      "08": {
        "value": "2.5rem"
      }
    }
  }
}
```

Tokens are described. Time to turn them into SCSS variables. Let's create *build.js* file at the root of our library.

```jsx
const { readdirSync, writeFileSync, existsSync, mkdirSync, rmdirSync } = require('fs');
const StyleDictionary = require('style-dictionary');

const baseDir = `${__dirname}/tokens`;
const distDir = `${__dirname}/dist`;

// Remove and create dist folder
if (existsSync(distDir)){
  rmdirSync(distDir, { recursive: true });
}

mkdirSync(distDir);

// Style dictionary format https://amzn.github.io/style-dictionary/#/api?id=registerformat
StyleDictionary.registerFormat({
  name: 'json/flat',
  formatter: (dictionary) => JSON.stringify(dictionary.allProperties, null, 2)
});

// Add a custom transformGroup to the Style Dictionary, which is a group of transforms.
// https://amzn.github.io/style-dictionary/#/api?id=registertransformgroup
StyleDictionary.registerTransformGroup({
  name: 'tokens-scss',
  transforms: ['name/cti/kebab', 'time/seconds', 'size/px', 'color/css']
});

// Get all theme names in tokens/themes folder
const themes = readdirSync(`${baseDir}/themes/`, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name);

// Save theme names in json file
writeFileSync(`${distDir}/themes.json`, JSON.stringify({
  themes: themes
}));

// Build properties
StyleDictionary.extend(getConfig()).buildPlatform('web/scss');
// Build themes
themes.map(function (theme) {
  StyleDictionary.extend(getConfig(theme)).buildPlatform('web/scss');
});

// https://amzn.github.io/style-dictionary/#/config
function getConfig(theme = false) {
  const source = theme ? `${baseDir}/themes/${theme}` : `${baseDir}/properties`;
  const buildPath = theme ? `${distDir}/${theme}/` : `${distDir}/`;
  return {
    source: [`${source}/**/*.json`],
    platforms: {
      'web/scss': {
        transformGroup: 'scss',
        buildPath: `${buildPath}`,
        files: [
          {
            destination: 'tokens-map.scss',
            format: 'scss/map-flat',
            options: {
              showFileHeader: false
            }
          }
        ]
      }
    }
  };
}
```

Ok, what's going on here:

1. Re-creating the dist folder, if it exists;
2. Configuring the Style-Dictionary;
3. For each theme, we create individual set of tokens. For properties tokens we create own set also;
4. Saving list of themes in the *theme.json* file;

Style Dictionary can do a lot more, I advise you to play with its settings. More information about the Style-Dictionary API can be found on the [official website](https://amzn.github.io/style-dictionary/#/api?id=api). Adding the launch to the script block *package.json*, as a result of running which we should have a dist folder with results of our build:

```json
...
"scripts": {
    ...
    "tokens": "node src/lib/build.js"
}
...
```

## Themes, themes, themes...

OK, the tokens are described and generated, now they must be assigned. But we don't have CSS variables, only SCSS arrays. To generate CSS tokens, we will use SCSS each loops, then transform each variable into CSS and apply it to the root DOM element. Create the themes.scss file in the root of our library:

```scss
:root {
  @import './dist/tokens-map';
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}

:root {
  @import './dist/default/tokens-map';
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}
```

Let's create styles.scss in the root of our app and import themes into it.

```scss
@import './lib/themes.scss';
```

In turn, the created file should be imported *src/main.js* of our app:

```jsx
import Vue from 'vue';
import App from './App.vue';
import './styles.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Let's launch our `npm run serve` app. In chrome developers tools, you should see two sets of variables assigned to the [root pseudo-class](https://developer.mozilla.org/ru/docs/Web/CSS/:root):

![Two sets of variables assigned to the root pseudo-class](/src/assets/images/root_pseudoclass_variables.png)

Tokens are in DOM. Now it remains to assign them to the elements of our app. Delete styles associated with the color in the *App.vue* and *HelloWorld.vue* files. The colors should be reset to default states in the browser. In the *styles.scss* file, assign tokens to the elements.

```css
@import './lib/themes.scss';

body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-size: 20px;
  line-height: 1.6;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  transition-property: background-color;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  background-color: var(--color-background-page-primary);
  color: var(--color-text-primary);
}

a {
  color: var(--color-link-default);

  &:visited {
    color: var(--color-link-visited);
  }

  &:hover {
    color: var(--color-link-hover);
  }
}

button {
  cursor: pointer;
  outline: none;
  border-radius: var(--border-radius-m);
  padding: var(--spacing-content-03) var(--spacing-content-05);
  background-color: var(--color-interactive-default);
  border: var(--border-element-02) var(--color-interactive-default);
  color: var(--color-interactive-above);

  &:hover {
    background-color: var(--color-interactive-hover);
    border-color: var(--color-interactive-hover);
  }

  &:active {
    background-color: var(--color-interactive-active);
    border-color: var(--color-interactive-active);
  }

  &:focus {
    border-color: var(--color-interactive-focus);
  }
}
```

Great, we're almost there. Now we have only one theme and it is assigned to the root pseudo-class. This is the correct decision, variables should be assigned to this pseudo-class. But we need to switch our themes, and the element parameter tokens should be higher priority than the theme tokens. If *:root* represents the <html> element and is identical to the selector html, the next highest priority element is body. This means that we should assign theme tokens to this body element. Let's modify our app by adding a trigger for switching themes.

```html
<template>
  <div id="app" class="app">
    <button class="trigger" title="Theme color mode" @click="changeTheme">
      <span class="icon"></span>
    </button>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import themes from './lib/dist/themes.json';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      theme: 0
    }
  },
  watch: {
    theme(newName) {
      document.body.setAttribute('data-theme', themes.themes[newName]);
    }
  },
  mounted() {
    document.body.setAttribute('data-theme', themes.themes[this.theme]);
  },
  methods: {
    changeTheme() {
      this.theme = this.theme < (themes.themes.length - 1) ? ++this.theme : 0;
    }
  }
}
</script>

<style lang="scss">
.app {
  position: relative;
  padding: var(--spacing-layout-02) var(--spacing-layout-04);
}
.trigger {
  position: absolute;
  top: var(--spacing-layout-02);
  right: var(--spacing-layout-04);
  display: flex;
  background-color: var(--color-interactive-default);
  padding: var(--spacing-content-01) var(--spacing-content-01);
  border: var(--border-element-02) transparent;

  .icon {
    position: relative;
    display: inline-block;
    background: linear-gradient(-90deg, var(--color-background-page-primary) 50%, var(--color-interactive-default) 50%);
    border-radius: var(--border-radius-s);
    height: 20px;
    width: 20px;
  }

  &:hover {
    background-color: var(--color-interactive-hover);

    .icon {
      background: linear-gradient(-90deg, var(--color-background-page-primary) 50%, var(--color-interactive-hover) 50%);
    }
  }

  &:focus,
  &:active {
    background-color: var(--color-interactive-active);

    .icon {
      background: linear-gradient(-90deg, var(--color-background-page-primary) 50%, var(--color-interactive-active) 50%);
    }
  }
}
</style>
```

What's going on here? When our app is mounted, we add the default theme to the app. When click on trigger happens, next theme from the *themes.json* file adding to the body attribute. Everything is quite simple, let's add a new theme to check it. To do this, simply duplicate the *lib/tokens/themes/default* folder to a folder next to it and name it, for example, dark. Change the tokens in the theme to the desired ones and generate it using `npm run tokens` command. To make the themes apply, we modify our *lib/themes.scss* file by adding a new theme to it.

```scss
[data-theme='dark'] {
  @import './dist/dark/tokens-map';
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}
```

Unfortunately, if you reload the page now, the theme value will be reset to the initial one. To fix this, we can use localstorage to store the selected theme. Let's fix our *App.vue*

```jsx
watch: {
  theme(newName) {
    localStorage.theme = newName;
    document.body.setAttribute('data-theme', themes.themes[this.theme]);
  }
},
mounted() {
  if (localStorage.theme) {
    this.theme = localStorage.theme;
  }
  document.body.setAttribute('data-theme', themes.themes[this.theme]);
}
```

What we need! Thanks to localStorage, we can store the selected names of our themes in the user's browser and use it when the user returns to the app, even if they have closed the browser.

## Last things, but not least

So our themes work and are saved in the user's browser. This way we can create as many themes as we want, limiting ourselves only to our imagination. There are a few inconvenient points. First, we need to modifying themes.scss file every time then we creating new theme. This is normal, but we developers are lazy people and it would be great to generate this file automatically. The second problem is running the generation script every time we changed the token. We could add watcher and leave this process in the background to focus on the design. Ok install dependencies:

```bash
npm i json-templater prettier -D
```

Let's add a function for generating a SCSS file with importing themes to our *lib/build.js*:

```jsx
function createFiles(themes) {
    // Save theme names in json file
  writeFileSync(`${distDir}/themes.json`, JSON.stringify({
    themes: themes
  }));

  const themeImport = `[data-theme='{{theme}}'] {
      @import './{{theme}}/tokens-map';
      @each $name, $value in $tokens {
        --#{$name}: #{$value};
      }
    }`;

  const themesTemplate = [];
  themes.forEach(t => {
    themesTemplate.push(
      render(themeImport, {
        theme: t
      })
    );
  });

  const template = `
    :root {
      @import './tokens-map';
      @each $name, $value in $tokens {
        --#{$name}: #{$value};
      }
    }

    {{themes}}
  `;

  const content = render(template, {
    themes: themesTemplate.join(' ')
  });

  const prettierOptions = {
    parser: 'scss',
    singleQuote: true
  };
  // Save themes in scss file
  writeFileSync(path.join(distDir, `themes.scss`), prettier.format(content, prettierOptions));
}
```

Great! We don't need the *lib/themes.scss* file anymore, it will be generated automatically in the lib/dist folder, so we just need to replace importing themes in the */src/styles.scss* file

```scss
@import './lib/dist/themes.scss';
```

We need to add watcher for token, because it is very dull generate tokens manually every time when we change them. A quick cross platform command line utility for viewing changes to the file system chokidar CLI will help us do this:

```bash
npm i chokidar-cli -D
```

Add watch command to our scripts block in *package.json*. We will also change the build and serve commands by adding token generation command before it. The final scripts block should look like this:

```json
...
"scripts": {
  "serve": "npm run tokens && vue-cli-service serve",
  "build": "npm run tokens && vue-cli-service build",
  "lint": "vue-cli-service lint",
  "tokens": "node src/lib/build.js",
  "watch": "npm run tokens && chokidar \"src/lib/tokens/**/*.json\" -c \"npm run tokens\""
}
...
```

Congratulations! We have created a small library with token generation and themes, and may have started something bigger. Nothing prevents us from scaling the set of tokens for components and themes. The [source code](https://github.com/ivandata/another-way-to-create-themes) can be found on the github page. The [result](https://ivandata.github.io/another-way-to-create-themes/) can be viewed here.

## Useful links
- [How we created a dark UI for GitLab's Web IDE](https://about.gitlab.com/blog/2020/05/20/creating-a-dark-ui-for-gitlabs-web-ide/) — about design process to create themes from [Marcel van Remmerden](https://twitter.com/MvRemmerden).
- [A Complete Guide to Dark Mode on the Web](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) — big guide for developers mostly from [adhuham](https://twitter.com/adhuhamism).
- [Supporting Dark Mode in Your Website](https://jec.fyi/blog/supporting-dark-mode) — how to implement dark mode support on your website from [jecelynyeen](https://twitter.com/jecelynyeen).
