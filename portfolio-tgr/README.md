# Tomas G. Rech - Pentester Portfolio

This is my personal portfolio site, built to show off my work in offensive security: certifications, completed HTB/THM machines, writeups, and general pentesting stuff. It's bilingual (English/Spanish), fully static, and deploys to Cloudflare Pages.

## What's on the site

- Experience section with writeups (PDFs open in a modal)
- Certifications
- A carousel of completed HTB/THM machines, pulled from a JSON file and filterable by difficulty and OS
- Contact info and links (LinkedIn, GitHub, etc)

## Stack

Built with [Astro](https://astro.build). The React integration is installed but not actually used, everything is server rendered HTML plus a single vanilla JS block that runs all the interactivity on the page. No component framework, no state library, just one big `index.astro` file doing the work.

Styling is hand written CSS, no Tailwind or any framework. There's also a WebGL shader running in the background (a CRT/terminal effect) using the `ogl` library.
