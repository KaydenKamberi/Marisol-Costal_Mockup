# Marisol — Coastal Kitchen & Bar

A four-page marketing site for a fictional Baja-inspired seafood restaurant with
three San Diego locations. Built as a portfolio demonstration piece.

Static HTML and CSS with about 170 lines of JavaScript. No build step, no
bundler, no npm, no dependencies to install.

---

## Running it

Open `index.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

### Deploying to GitHub Pages

Settings → Pages → Deploy from a branch → pick the branch, folder `/ (root)`.
Nothing else to configure. A `.nojekyll` file is included so Pages serves the
files verbatim instead of running them through Jekyll.

---

## Structure

```
index.html          Home — tile hero, intro, signature dishes, locations strip
menu.html           Full menu, seven sections
locations.html      Three locations, hours, table request form
about.html          Origin story and chef bio
assets/
  css/custom.css    Design tokens, base, components, page styles, print
  js/main.js        Mobile nav toggle; form validation and fake-submit
  images/           Empty — see "Images" below
.nojekyll           Tells GitHub Pages to skip Jekyll processing
```

The header and footer markup is byte-identical across all four pages, apart
from `aria-current="page"` on the active nav link. If you change one, change all
four.

---

## Design system

Everything lives as custom properties at the top of `assets/css/custom.css`.
Tailwind is loaded from its CDN in each page's `<head>` and configured inline to
read those same custom properties, so colour has a single source of truth.

### Palette

| Token | Hex | Role |
|---|---|---|
| `--cal` | `#EEF1F3` | Whitewashed lime plaster — the page ground |
| `--sal` | `#FFFFFF` | Pure white — "chrome and ice" panels sitting on the wall |
| `--hielo` | `#D6DEE4` | Hairline rules and separators |
| `--cobalto` | `#1B44B8` | Talavera cobalt — full colour fields only, never a border |
| `--tinta` | `#0C1E4E` | Ink navy — all body type, and the footer field |
| `--chile` | `#C9241A` | The single accent — actions and emphasis |

`--chile` measures 4.93:1 against `--cal` in both directions, so one value works
as text on the ground *and* as a label on a filled button. There is no second
"accessible variant" to keep in sync.

### Type

**Anton** for display (the painted market sign) and **IBM Plex Sans** for
everything else, both from Google Fonts. Plex was chosen partly for its true
tabular figures — the menu depends on them to align prices without a hack.

The scale is modular at roughly 1.25, `--step--2` through `--step-6`, fluid at
the top end via `clamp()`. Body line length is capped at 62 characters.

### Three rules the design follows

1. **Grout, not shadow.** Structure comes from flat blocks butted together with
   the ground showing between them. Nothing floats, nothing has a drop shadow,
   and `border-radius` is 0 everywhere on the site.
2. **Hard sun, no haze.** Full saturation, full opacity, no gradients and no
   dark scrims over photographs. Text that needs to be legible sits on a solid
   field *beside* an image, never on top of it.
3. **Prices are the second headline.** They are set in tabular figures at the
   same size and weight as the dish name, never in a lighter grey.

---

## Images

Every image is a Lorem Picsum placeholder addressed by a **seed**, so the same
photo loads on every refresh and layouts stay stable:

```
https://picsum.photos/seed/marisol-hero/1000/1250
```

Seeds follow `marisol-<what-it-is>` and every slot uses a distinct one, so no two
positions ever show the same photo. There are 11 in total:

`marisol-hero`, `marisol-ceviche`, `marisol-baja-fish-taco`, `marisol-branzino`,
`marisol-camarones`, `marisol-la-jolla`, `marisol-north-park`, `marisol-coronado`,
`marisol-fish-counter`, `marisol-chef-elena`, `marisol-wood-grill`.

### Swapping in real photography

Find them all with:

```
grep -rn "picsum.photos" *.html
```

Replace the `src` value and leave `width`, `height` and `alt` in place, or update
them to match the new file. Those attributes are what stop the layout shifting
while images load, so do not drop them. Images are cropped with `object-fit:
cover`, so a different aspect ratio will still fill its slot correctly.

---

## The reservation form is non-functional by design

The form on `locations.html` validates in the browser and then swaps itself for a
confirmation panel. **It does not submit anywhere.** There is no endpoint, no
email handler and no network request — nothing typed into it leaves the browser,
and the confirmation panel says so in plain language.

This is deliberate, not an oversight. Wiring it to a real service (Formspree,
Netlify Forms, or your own backend) is a next step: point the `<form>` at an
action URL, remove the `event.preventDefault()` in `assets/js/main.js`, and keep
the existing validation as a first pass.

---

## Accessibility

Checked in Chromium rather than assumed:

- Colour contrast passes AA across header, main content and footer on all four
  pages, measured against actually painted backdrops.
- Every focusable element has a visible focus ring of at least 3:1 against
  whatever it sits on. The ring flips from chile to white inside cobalt and ink
  fields.
- All interactive targets are at least 24×24 CSS pixels.
- One `h1` per page, no skipped heading levels, one `main`/`header`/`footer`
  landmark per page, labelled navigation.
- Every image has descriptive alt text and explicit dimensions.
- The current page is signalled by an underline as well as colour, plus
  `aria-current="page"`.
- A skip link is the first tab stop.
- `prefers-reduced-motion` flattens every transition and disables smooth scroll.
- No horizontal scrolling from 320px upward, and none at 200% text-only zoom.
- Form errors are announced by moving focus to a summary that links to each
  offending field; each field also carries an inline message and `aria-invalid`.

## Browser support

Modern evergreen browsers. The layout uses CSS grid, custom properties,
`clamp()`, `aspect-ratio` and `object-fit`. The Tailwind config is guarded on
`window.tailwind`, so if the CDN is blocked or unreachable the page falls back to
`custom.css` cleanly rather than throwing.

## Printing

`custom.css` includes a print block. The menu prints to about three pages: no
navigation, no footer, no colour fields, black on white, with sections kept from
splitting across page breaks.

---

## Content note

Marisol is not a real restaurant. The addresses, phone numbers, email address,
staff, history and photographs are invented for this demonstration. The phone
numbers use the 555-01xx range reserved for fictional use. The footer says so
too, so the site cannot be mistaken for a real business.
