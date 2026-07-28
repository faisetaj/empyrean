# Empyrean Beauty — Salon & Barber Studio

Marketing site for Empyrean Beauty in New Caney, TX. React + Vite + Tailwind,
with a git-backed CMS so Kayla can edit the site without touching code.

Rebuilt from the original 2022 WordPress site (recovered via the Wayback
Machine) — same pages, copy and imagery, modernised.

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

| File            | Drives                                     |
| --------------- | ------------------------------------------ |
| `site.json`     | Contact details, hours, homepage, booking link |
| `services.json` | The full price list (Ladies / Gentlemen)   |
| `team.json`     | About page, staff bios, extra services     |
| `gallery.json`  | Gallery images and captions                |
| `careers.json`  | Careers page and open positions            |
| `blog.json`     | Blog posts                                 |

Images live in `public/images/` and are referenced as `/images/filename.jpg`.

## The CMS

Decap CMS is served at `/admin`. Kayla logs in with email + password, edits
through a visual form, and saving commits the change to this repo — which
triggers a Netlify rebuild. No deploy step for her to think about.

### One-time setup on Netlify

1. **Create the site** — connect this repo. Build command `npm run build`,
   publish directory `dist`. (`netlify.toml` already declares both.)
2. **Enable Identity** — Site configuration → Identity → Enable.
3. **Set registration to Invite only** — otherwise anyone could sign up and
   edit the site.
4. **Enable Git Gateway** — Identity → Services → Git Gateway → Enable. This
   is what lets the CMS commit on Kayla's behalf without giving her a GitHub
   account.
5. **Invite Kayla** — Identity → Invite users. She gets an email, sets a
   password, and lands in the editor.

### Pointing the GoDaddy domain at it

Domain is registered with GoDaddy (customer #701300221). In Netlify: Domain
management → Add a domain → `empyreanbeauty.com`. Netlify will show the DNS
records to create in GoDaddy — either the four `A` records for the apex plus a
`CNAME` for `www`, or switch the nameservers to Netlify's for simpler
management. HTTPS is issued automatically once DNS resolves.

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

## Still to confirm before launch

- Real GlossGenius booking URL
- Opening hours (currently a sensible default, not confirmed)
- Facebook / Instagram handles
- Whether `info@empyreanbeauty.com` is still a live mailbox
- Contact form currently opens the visitor's mail client; swap for Netlify
  Forms or Formspree if a real inbox flow is wanted
- Fresh photography — the recovered archive images are placeholders and several
  are stock backdrops rather than the actual studio

## Design notes

Palette and type descend from the original site: charcoal `#161922`, smoke
`#8E8E8E`, bone `#F7F7F7`. The chrome logotype is echoed by a platinum gradient
on display text, warmed with a champagne accent (`#C5A059`) so the page isn't
cold grey-on-grey. Type is Cormorant Garamond over Inter — a modern take on the
original's Noto Serif and Lato pairing.
