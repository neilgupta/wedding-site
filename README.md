# Wedding Invites

I recently got married, so naturally I built my own wedding website. We wanted to create personalized invites for each guest so we could default to their preferred language and customized info (like a pub crawl only for friends or hotel info only for those traveling). To that end, I wrote a simple Next.js app that reads invite data from a config file and generates every permutation of invites into a static site that can be hosted for free.

The idea here was that if Lynn visited `katelijne.wedding/lynn`, she would see an invite from Kat written in Dutch and personalized to her. If she visited `neil.wedding/lynn`, she would see the same invite from my perspective (written in English, swapped pronouns, more liberal use of emojis, etc).

One limitation with this architecture was that because it's 100% static, there's no database and all RSVP's needed to be manually updated in the config file whenever I got a webhook notification. Given our guest list size, this was easily manageable.

## Features

* Setup dedicated invite codes for each guest
* Collect RSVP's into a [Guilded](https://guilded.gg) channel
* Generate ics file for guests to add event to their calendar
* Multi-language support for international weddings
* Multi-domain support to show different content based on domain
* See stats on rsvp's
* Static website means you can host it for free on Netlify/Vercel/GitHub Pages

## Demo

Here are some different variations of the invite based on env var and `invites.js` config:

* https://wedding.neil.gg/dk
* https://katwedding.neil.gg/dk - same invite from Kat's perspective, written in Dutch
* https://wedding.neil.gg/eric - invite includes pub crawl
* https://katwedding.neil.gg/eric - same invite from Kat's perspective, still in English

See https://wedding.neil.gg/tacocat for the RSVP's dashboard

## Setup

1. run `npm install` to install dependencies
2. create `.env.local` with `NAMESPACE=kat`
3. run `npm run dev` to start dev server
4. visit `http://localhost:3000`

## Customize

1. Add your invites to `invites.js`
2. Update Guilded webhook and email address in `.env`
3. Update your namespace in `.env.local`
4. Update invite content in `pages/[invite].js` and `locales/*`
5. Rename `tacocat.jsx` to something else to customize your secret dashboard url
6. Update your [plausible](https://plausible.io) `data-domain` in `pages/_app.js` or replace with another analytics service
