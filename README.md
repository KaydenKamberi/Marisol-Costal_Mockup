# Marisol — Coastal Kitchen & Bar

A static marketing site for a fictional Baja-inspired seafood restaurant with three
San Diego locations. Built as a portfolio demonstration piece.

> **Status: checkpoint 5 of 6.** All four pages are designed and responsive. The
> polish pass, accessibility review and the full version of this README land in
> checkpoint 6.

## Running it

There is no build step, no bundler, and no npm. Open `index.html` directly, or serve
the folder:

```
python3 -m http.server 8000
```

GitHub Pages can serve it straight from the repository root.

## Structure

```
index.html          Home
menu.html           Full menu
locations.html      Three locations + table request form
about.html          Origin story and chef bio
assets/
  css/custom.css    Design tokens, base styles, shared components
  js/main.js        Mobile nav toggle, form validation and fake-submit
  images/           Empty — see "Images" below
```

Tailwind is loaded from its CDN in each page's `<head>`, configured inline to read the
palette and font stacks from the CSS custom properties in `custom.css`, so colors have
a single source of truth.

## Images

Every image is a Lorem Picsum placeholder addressed by a **seed**, so the same photo
loads on every refresh and layouts stay stable:

```
https://picsum.photos/seed/marisol-hero/1000/1250
```

Seeds follow `marisol-<what-it-is>` and every slot uses a distinct one, so no two
positions show the same photo. To swap in real photography, replace the `src` value and
leave the `width`, `height`, and `alt` attributes alone (or update them to match the new
file). Find them all with:

```
grep -rn "picsum.photos" *.html
```

Current seeds: `marisol-hero`, `marisol-ceviche`, `marisol-baja-fish-taco`,
`marisol-branzino`, `marisol-camarones`, `marisol-la-jolla`, `marisol-north-park`,
`marisol-coronado`, `marisol-fish-counter`, `marisol-chef-elena`, `marisol-wood-grill`.

## The reservation form is non-functional by design

The form on `locations.html` validates in the browser and swaps itself for a
confirmation panel. **It does not submit anywhere.** There is no endpoint, no email
handler, and no network request — nothing typed into it leaves the browser. Wiring it to
a real service (Formspree, Netlify Forms, or a backend of your choice) is a deliberate
next step, not an oversight.

## Content note

Marisol is not a real restaurant. The addresses, phone numbers, email address, staff, and
history are all invented for this demonstration. The phone numbers use the 555-01xx range
reserved for fictional use.
