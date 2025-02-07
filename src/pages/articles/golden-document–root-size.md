---
layout: ../../layouts/article.astro
title: "Golden document root size"
description: "Why I prefer to use the default root document size and why it shouldn't be changed."
keywords: "16px, golden ratio, typography, root document size, root, font-size, default size, scalable, visual rhythm, media queries, design system"
date: 2020-12-28
image:
  attrs: ./images/tschichold_schreibt.jpg
  alt: Jan Tschichold
  caption: ''
---

Now it is difficult to find information on why all modern browsers use 16px as the default. 
Almost all famous fonts on the web are created for this size. This can also change depending on if the font uses serifs 
or is a fixed-width font, but most of all fonts look good on 16px size. On almost all sites, this is the default number. 
But why 16? 

I didn't find the history, but in fact, it is a very convenient number and it is not difficult to guess why exactly 16.
Computer monitors consist of pixels of the image. The pixel is always at least **1**. So the minimum value for scaling is best 
to take the minimum natural number — **2**. The Internet is primarily texted content and readability is a top priority. 
**16** — is the size at which the font remains natural when scaled, does not deform, and at the same time remains readable 
for most of the popular line length — 800px.

IBM uses a [2x grid system](https://carbondesignsystem.com/guidelines/2x-grid/overview), the base unit of which is the 
8-pixel square mini-unit. The basic concept of which is to divide or multiply by two, forming a visual rhythm.

As for usability expert, Oliver Reichenstein recommends using 16px font-size for most situations. 
He wrote [5 simple rules](https://ia.net/topics/100e2r) for good web typography, and the first rule reads:
>Initially it is more difficult to create a visually pleasing layout with a bigger font size, but that challenge will 
>help you design a simpler, clearer site. Anyone can cram a page with information, but making it simple and easy-to-use 
>is hard. At first, you will be shocked by how big the default text is. But after a day you won’t want to see anything 
>smaller, and you quickly realize why all browsers use the default text size.

## REM is everywhere
"rem" is a very convenient unit. It allows you to scale the entire interface relative to the root size of the document. 
There are many properties in hand, including font-size, font-weight, line-height, padding, and, if relevant, borders, 
which can be scaled very quickly to meet your requirements while maintaining the proportions of the content.
A very good article on the topic of ["Sizes in Design Systems"](https://medium.com/eightshapes-llc/size-in-design-systems-64f234aec519)
from Nathan Curtis.

## What happens if you don't follow this rule?
If you are not going to make a scalable library, and transfer all your experience to other projects, then probably nothing terrible. 
But sooner or later, everyone does, and keeping the *golden browser standard* helps make it easier for us to scale, and here's why: 
- You don't need to change most of the font attributes and dimensions like line-height and font-size. 
- You don't need to comb through all places there you use REM on pages.

Seriously, much more easily change root size depends on media queries instead change all parameters every time you scale 
your library to other projects. One of the common problem that design system solve is **cross-platform consistency**: 
if you always follow the default 16px rule for all browsers then your interfaces would look good everywhere when 
integrating your design system. 

**That's why changing the root size is a bad idea — the complexity of scaling out.**

- If you have a 16px design system and a different size for other sites. You should configure all dimensions in tokens 
to scale your design system or you should reset root size to default and change all dimensions to scale the site.
- If you have a 16px design system and the same size for other sites. You just keep all dimensions.
- If you have a design system with a different size from the default root size. Well, I hope you know what you doing =)

But I don't like how my font looks with 16px. I want to set my font-size as 17! May I do it? And my answer — yes, just use media queries.

## Conclusion
Keep default document size and change it only with media queries. One of the main reasons then we need to change root size 
is a line length (text column width, also called “the measure”) more than 800px and reading distance. Relevant to this day's 
article ["Responsive Typography: The Basics"](https://ia.net/topics/responsive-typography-the-basics) from Oliver Reichenstein 
will help you figure out what font to choose for your screens.

I prefer to use percentages for document size. It keeps root size by default but helps scale your interfaces without 
having to take a maths degree.

```css
:root {
  --font-base: 100%;
}
html {
 font-size: calc(var(--font-base));
}
@media (min-width: 66rem) {
  html {
    font-size: calc(var(--font-base) + 25%);
  }
}
```

>If you can’t make your website look nice without text in images, I am afraid that you will have to start again from scratch. ©
