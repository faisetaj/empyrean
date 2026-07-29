# Credits

## Forever Components

Two effects on this site are adapted from
[Forever Components](https://forever-components.vercel.app/infinite), a free
catalogue of 617 self-contained vanilla components.

| Ours | Source | What carried over |
| --- | --- | --- |
| `AmbientCanvas` — `strands` motif | Art Nouveau → **Wave Tress** | The whiplash strand geometry: swell through the middle, a curl at the tip, per-strand phase and drift |
| `TracedFrame` | Art Nouveau → **Border Flourish** | The `stroke-dasharray` / `stroke-dashoffset` self-drawing trace |

Nothing was copied verbatim. Both originals are gold-on-dark period pieces —
Wave Tress's own metadata lists `"avoidWhen": "Light backgrounds"` — so only
the technique was ported, then recoloured to charcoal on white and stripped of
ornament that fought this site's restraint:

- **Wave Tress** — dropped the floral blossoms and the dark vignette; dropped
  the gold/sage/rose palette; cut stroke alpha to roughly a tenth of the
  original so it sits behind body copy without competing.
- **Border Flourish** — dropped the blossoms, petals, leaves and stained-glass
  fills entirely. Corner tendrils were ported, reviewed, and cut: at frame
  scale they read as rendering artefacts rather than ornament.

### Why so little of a 617-component library

Because almost none of it fits. Of the 617, only 3 pair a light ground with a
neutral accent, and the ~30 previously vendored into the `authyr` repo are all
dark (`#08090d`-ish) with neon accents, and 26 of those are SaaS dashboard UI —
donut gauges, sparklines, upload bars — for which this site has no use.

The genuinely on-brand themes for a salon are Art Nouveau and Art Deco. Art
Nouveau won: it is organic and hair-like where Art Deco is geometric and, in
this catalogue, uniformly gold — a colour this brand has explicitly rejected.

### Licence

The catalogue ships a `NOTICE.md` covering artistic-style attribution but no
explicit code licence. The client confirmed the library is free to use. Since
both effects here are re-implementations rather than copies, this file serves
as attribution.
