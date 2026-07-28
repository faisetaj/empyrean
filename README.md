# Empyrean Beauty Parlor

Marketing site for Empyrean Beauty Parlor in New Caney, TX. React + Vite +
Tailwind, with a git-backed CMS so Kayla can edit the site without touching
code.

Rebuilt from the original 2022 site (recovered via the Wayback Machine) — same
pages and copy, modernised, and updated to a beauty parlor: no barbering, no
beard or shave services.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the production build
```

## Where the content lives

Every piece of editable text and imagery is JSON under `src/content/`. Pages
import these directly — there is no database and no API call at runtime.

| File            | Drives                                         |
| --------------- | ---------------------------------------------- |
| `site.json`     | Contact details, hours, homepage, booking link |
| `services.json` | The full price list (Ladies / Gentlemen)       |
| `team.json`     | About page and Kayla's bio                     |
| `gallery.json`  | Gallery images and captions                    |
| `blog.json`     | Blog posts                                     |

Images live in `public/images/` and are referenced as `/images/filename.jpg`.

## The CMS — how Kayla logs in

Decap CMS is served at **`/admin`** (e.g. `empyreanbeautyparlor.com/admin`). It is
*not* live until the Netlify steps below are done — the page will load but
login will fail without Identity and Git Gateway enabled.

There is no separate username/password database and nothing to install. Kayla
is invited by email, sets her own password, and from then on logs in at
`/admin`. Saving commits the change to this repo, which triggers a Netlify
rebuild — no deploy step for her to think about.

### One-time setup on Netlify

1. **Create the site** — connect this repo. Build command `npm run build`,
   publish directory `dist`. (`netlify.toml` already declares both.)
2. **Enable Identity** — Site configuration → Identity → Enable Identity.
3. **Set registration to Invite only** — Identity → Registration preferences.
   Without this anyone could sign up and edit the site.
4. **Enable Git Gateway** — Identity → Services → Git Gateway → Enable. This
   is what lets the CMS commit on Kayla's behalf without giving her a GitHub
   account.
5. **Invite Kayla** — Identity → Invite users → her email address.

She gets an email, clicks the link, sets a password, and lands in the editor.
To add more editors later, repeat step 5. To reset a password, she uses the
"Forgot password" link on `/admin`.

> If invite emails land in spam, Netlify's Identity settings let you point at
> your own SMTP provider.

### Pointing the GoDaddy domain at it

Domain is registered with GoDaddy (customer #701300221). In Netlify: Domain
management → Add a domain. Netlify will show the DNS records to create in
GoDaddy — either the four `A` records for the apex plus a `CNAME` for `www`,
or switch the nameservers to Netlify's for simpler management. HTTPS is issued
automatically once DNS resolves.

## Booking / GlossGenius

Kayla uses **GlossGenius** for scheduling and payments. GlossGenius has no
public API and no Zapier integration, so the site cannot read her services or
prices from it automatically — the two are kept in sync by hand through the
CMS.

What *is* wired up: every "Book Now" button links out to her GlossGenius
booking page. Set that URL once in the CMS under **Site Settings → General &
Homepage → Booking link**, and every button across the site follows it.

> `site.json` currently ships a placeholder (`https://glossgenius.com/`).
> Replace it with the real booking URL before launch.

## Launch checklist

Nothing is published yet. In rough order:

1. **Kayla creates her GlossGenius account**, then paste the booking URL into
   the CMS (Site Settings → Booking link). Until then every Book Now button
   points at the `https://glossgenius.com/` placeholder.
2. **Deploy to Netlify** and complete the Identity / Git Gateway steps above.
3. **Point `empyreanbeautyparlor.com` at Netlify** from GoDaddy. The canonical
   URL, sitemap, structured data and social tags already use this domain.
4. **Confirm opening hours** — the current ones are a placeholder assumption,
   and they are published in the page's structured data, so Google will show
   them.
5. **Confirm Facebook / Instagram handles** — currently guessed from the
   business name.

Nice to have, not blocking:

- Contact form opens the visitor's mail client. Swap for Netlify Forms or
  Formspree if submissions should land in an inbox.
- Fresh photography. The recovered archive images are placeholders and a few
  are stock rather than the actual parlor.
- Kayla's portrait is rendered monochrome to fit the palette; remove
  `grayscale` in `src/pages/About.jsx` to show it in colour.

## Design notes

Light theme, matching the original site and the logo itself: white and `#F7F7F7`
grounds, `#14171E` near-black type, silver-grey accents (`#C4C7CD` rules,
`#5C6270` body copy). No gold anywhere — the brand reads black, white and
chrome. Primary buttons are solid charcoal on white.

Type is Cormorant Garamond over Inter — a modern take on the original's Noto
Serif and Lato pairing.

Body copy uses `#5C6270` rather than the original `#8E8E8E`, which only reaches
about 3.5:1 on white and fails WCAG AA for text. `smoke` is kept in the palette
for decorative use only.

The original logo artwork has "SALON AND BARBER STUDIO" baked into the image,
so it can't be used now. `src/components/Logo.jsx` pairs the clean EB monogram
with a typeset wordmark instead — which also scales and recolours better than
a raster logo.
