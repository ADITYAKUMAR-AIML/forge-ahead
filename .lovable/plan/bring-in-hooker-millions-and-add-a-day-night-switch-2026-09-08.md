# Bring in "Hooker & Millions" and add a day/night switch

## What the repo contains

I downloaded and read the whole project. It is a browser-only fictional wealth simulator, same tech stack as this project:

- 11 pages: Dashboard, Acquire, Businesses, Stock Market, Investments, Properties, Assets, Events, Transactions, Save & DEBUG.
- A game engine and data catalogues (businesses, stocks, investments, properties, assets, characters, events, lifestyles), plus day-advance logic and browser-saved progress.
- A shared shell with a sidebar, sticky top bar with money/day chips, and a mobile menu.
- Local placeholder images under public/assets, the full shadcn UI component set, Cormorant Garamond + Karla fonts.
- A single dark "luxury" look: black, burgundy, magenta, purple, gold. There is currently no light version at all — the dark colours live directly in `:root` and the page background glow is hard-coded in the stylesheet.

## Step 1 — Copy the project in

Bring every file across (pages, game logic, data, components, images, fonts, metadata) so this project runs the game exactly as the repo does, and install the few extra packages it needs. The current placeholder home page is replaced by the game dashboard.

## Step 2 — Day/night toggle

Because the site only has a night look today, a real light theme has to be authored:

- Split the palette: move today's colours into a night theme and write a matching day theme — warm ivory/champagne background, deep ink text, the same burgundy/magenta/gold accents darkened so they stay readable on light backgrounds. The decorative background glow and gold gradient text get a light-mode variant too.
- Add a sun/moon button in the top bar (and in the mobile menu) that flips between day and night.
- Remember the choice in the browser, follow the device setting the first time, and apply it before the page paints so there is no flash of the wrong theme.
- Check every page in both modes: cards, tables, charts, badges, toasts, sidebar, dialogs.

## Technical notes

- Copy the repo's `src/`, `public/assets`, config and dependency additions; keep this project's existing router/error-reporting files where they are identical.
- Introduce `.light` / `.dark` classes on `<html>` with a small theme provider plus an inline pre-hydration script in the root shell; keep `color-scheme` in sync.
- Both palettes stay as CSS tokens in `src/styles.css`; no component gets hard-coded colours.
