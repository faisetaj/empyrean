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

The client photos (September 2026) came straight off iPhones: 2–7 MB each,
Display P3 colour, rotation stored in EXIF, and GPS coordinates on about half
of them. Each was rotated upright, converted to sRGB, capped at 1600px on the
long edge, saved as progressive JPEG at quality 80, and written with **no EXIF
at all** — which is what removes the location. Do the same for new photos.
The CMS uploads files exactly as given, so a photo Kayla adds from her phone
through `/admin` goes live full size and with its metadata intact.

Three photos recovered from the 2022 site (`empyrean-beauty-gallery-4/5/6`)
stay in the gallery: they show real parlor work. The other four archive images
were stock photography — studio backdrops and models — and are deliberately
not used, since the gallery presents itself as work from these chairs.

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

## Booking / Vagaro

Kayla uses **Vagaro** for scheduling and payments (moved from GlossGenius,
July 2026).

What is wired up today: every "Book Now" button links out to her Vagaro
services page, <https://www.vagaro.com/empyreanbeautyparlor/services>. The URL
is set once in the CMS under **Site Settings → General & Homepage → Booking
link**, and every button across the site follows it.

Linking to one category of her services needs a **Vagaro booking widget**. A
URL fragment such as `#col40485475` does nothing: Vagaro renders the service
list with JavaScript after load, so the browser has no element to scroll to
when it reads the hash. Widget links can be pasted into two optional
`bookingUrl` fields in `services.json` (both editable in the CMS):

- **Category** (Ladies, Gentlemen) — the Book Now button on that pricing tab
  uses it instead of the main link.
- **Service group** (Color Services, Hair Extensions, …) — adds a "Book" link
  beside that group's heading. With no link set, the heading shows "Price" as
  before.

### Auto-syncing services and prices — possible, but gated

Unlike GlossGenius, **Vagaro has a public REST API and webhooks** (OAuth 2.0;
webhooks fire on appointments, customers, employees and transactions). So a
true push-to-site sync — her price list living in Vagaro and the website
following it — is genuinely achievable here, which it never was before.

It is gated on her account, not on our code. Per Vagaro's developer terms, API
access requires:

- a request via Settings → Developers → APIs & Webhooks
- a paid, non-trial account **running Vagaro credit card processing**
- roughly 5–7 business days for approval
- about $10/month, including 5,000 API calls

Docs: <https://docs.vagaro.com/public/reference/api-introduction>

Until all of that is true, pricing stays in `src/content/services.json` and is
edited through the CMS. That is a deliberate ordering: the content layer works
on day one, and the API sync can replace it later without touching any page —
every page already reads from the JSON rather than from hardcoded markup.

## Copy changes without opening an editor

Label an issue `content-request` (or file one with the *Content change request*
template) and a GitHub Action turns it into a reviewed PR with a Netlify deploy
preview. Built for forwarding client texts in five seconds from a phone.

See [docs/CONTENT-REQUESTS.md](docs/CONTENT-REQUESTS.md) — including how to
reuse it on other repos, and the content-layer prerequisite that makes it safe.

Needs the [Claude GitHub App](https://github.com/apps/claude) installed and an
`ANTHROPIC_API_KEY` repository secret.

## Launch checklist

Live at <https://www.empyreanbeautyparlor.com> since September 2026 — GoDaddy
DNS points at Netlify, `www` is the primary domain and the bare domain
redirects to it. Identity is enabled with invite-only registration, and Git
Gateway is on. Git Gateway is deprecated by Netlify but still works; if it is
ever switched off, only CMS editing stops and the site is unaffected.

The opening hours stand until Kayla says otherwise. They are published in the
page's structured data, so Google shows them — update both `site.json` (via
the CMS) and the JSON-LD in `index.html` if they change.

Still open:

1. **Confirm Facebook / Instagram** — the links are guessed from the business
   name, and it is not yet known whether she has either account.
2. **Submit the sitemap** (`/sitemap.xml`, generated at build) in Google
   Search Console.

Nice to have, not blocking:

- Contact form opens the visitor's mail client. Swap for Netlify Forms or
  Formspree if submissions should land in an inbox.
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
