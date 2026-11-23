# Editing the site with Sanity

Almost all of the site's content is editable in Sanity Studio at **/studio**.
The blog is the exception: it still comes from Medium.

Until Sanity is connected, the site shows the content built into
`lib/content/defaults.ts`. The same file fills in any field left empty in Sanity,
so the site never shows a blank section.

## One-time setup

1. **Create a project.** Sign in at <https://www.sanity.io/manage> and create a
   new project with a dataset named `production`. Or run `npx sanity@latest init`
   and choose to create a new project.
2. **Add the environment variables.** Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: on the project's page in sanity.io/manage
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`

   Add the same two values in your hosting settings (Vercel → Project → Settings →
   Environment Variables).
3. **Allow the Studio's addresses.** In sanity.io/manage → API → CORS origins, add
   `http://localhost:3000` and your live domain, each with "Allow credentials" ticked.
4. **Copy today's content into Sanity.** Create a token in sanity.io/manage → API →
   Tokens with **Editor** rights, put it in `.env.local` as `SANITY_API_WRITE_TOKEN`,
   then run:

   ```bash
   npm run sanity:seed
   ```

   This uploads every image and creates all the documents. Running it again only
   adds documents that are missing. `npm run sanity:seed -- --force` overwrites
   them with the built-in content. The token is only needed for this step; don't
   add it to your hosting settings.
5. Restart `npm run dev` and open <http://localhost:3000/studio>.

## When changes show up

After you publish, the live site updates within about a minute. To make it
update straight away, add a webhook:

- Set `SANITY_REVALIDATE_SECRET` in your hosting settings to any long random string.
- In sanity.io/manage → API → Webhooks, add a webhook with:
  - URL: `https://<your-domain>/api/revalidate`
  - Dataset: `production`
  - Trigger on: Create, Update and Delete
  - Secret: the same string

## What's where in the Studio

| Studio item | What it controls |
| --- | --- |
| Site settings | Name, description, email, phones, WhatsApp, Telegram, booking and academy links, socials, headline numbers (trades, years, win rate, community, brands), footer tagline |
| Home page | Hero, About, Track record cards, Trading history intro, featured services, Testimonials intro, FAQ |
| About page | Hero and portrait, gold ticker words, story chapters (tabs), Experience intro |
| Services page | Heading, intro, "How to start" steps |
| Contact page | Heading and form text |
| Services | Each service on /services: name, icon, what's included, price, button, thumbnail |
| Testimonials | The scrolling client quotes |
| Experience | The roles on /about-me |
| Trading receipts | The payout and trade receipts on the home page desk, including where each one sits |
| Partner brands | The brand logos |
| Legal pages | Privacy, Terms, Risk disclaimer |

Tips:

- **Order:** Services, Testimonials, Experience, Receipts and Brands have an
  "Order" number. Lower numbers show first.
- **Image focus:** click the crop icon on an image to set its focal point. That
  decides what stays in view when the image is cropped.
- **Services artwork:** the five original services keep their custom artwork,
  matched by link name: `consulting`, `mentorship`, `private-trading`,
  `video-content`, `community-growth`. A new service shows its thumbnail instead.
- **Emptied lists come back:** if every document of one type is deleted (for
  example all testimonials), the site shows the built-in ones again. Unpublish
  or edit them rather than deleting the last one.

## For developers

- Schemas: `sanity/schemaTypes/`; Studio menu: `sanity/structure.ts`; config: `sanity.config.ts`
- Queries, plus the merge over the defaults: `lib/content/index.ts`
- Built-in content: `lib/content/defaults.ts`
- Requests are cached for 60 seconds and tagged `sanity`. `/api/revalidate` clears that tag.
