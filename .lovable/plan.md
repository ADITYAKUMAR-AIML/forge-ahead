# Always-light theme and first-visit tutorial

## Goal
Keep the game permanently light with dark-pink glitter accents, remove all day/night controls, and guide a new player through the core interface the first time they open the site.

## Changes

### 1. Lock the visual theme
- Remove the day/night toggle from both desktop and mobile navigation.
- Remove theme preference detection, saved theme state, and the pre-paint switching script.
- Make the root document light-only and simplify the design tokens to one light palette.
- Retain the luxury burgundy, gold, and magenta identity, while making the page background light and the glitter texture distinctly dark pink.
- Update panels, navigation, overlays, and text contrast so all existing pages remain readable in the permanent light treatment.

### 2. Add a first-visit guided tutorial
- Show a beginner-friendly welcome step automatically after the app is ready on a visitor’s first visit.
- Build a multi-step walkthrough with a dimmed overlay, a clear circular spotlight around the active control, and a directional arrow connecting it to the explanation.
- Explain the actual game flow in sequence: the dashboard, cash/net worth and other status values, navigation, acquiring collection entries, earning through businesses and markets, advancing the day, and checking events/transactions.
- Provide clear **Continue**, **Back**, **Skip**, and final **Begin** actions, plus a visible step count.
- Keep the highlighted control in view as the tutorial advances, including mobile layouts, without accidentally triggering game actions.
- Save tutorial completion separately in the browser so it does not reappear on every reload and does not alter or reset the player’s game save.
- Make the walkthrough keyboard-friendly, focus-safe, and respectful of reduced-motion settings.

## Technical details
- Add a focused tutorial component mounted within the shared game shell so it can point to controls present across the app.
- Mark tutorial targets in the shared shell and dashboard with stable identifiers; measure their rendered positions to place the spotlight, arrow, and explanation responsively.
- Use the existing button design and semantic color tokens rather than adding another interface library.
- Remove the now-unused theme provider, toggle component, and associated imports after the shell and root document no longer depend on them.

## Verification
- Confirm there is no theme control and no system preference can switch the site away from light mode.
- Check the light background and dark-pink glitter across the dashboard and representative inner pages.
- Run the entire tutorial on desktop and mobile, confirming every spotlight/arrow aligns, controls do not overlap, and Continue/Back/Skip/Begin work.
- Reload after completion and verify the tutorial stays dismissed while the game save remains intact.
- Check for browser errors and run the project’s automated validation.
