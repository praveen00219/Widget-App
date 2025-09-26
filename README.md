# AccuKnox Widget Dashboard (React + TypeScript + Vite)

A dynamic dashboard that renders categories and widgets from JSON data, with the ability to add/remove widgets per category, search across widgets, and persist state locally.

## Features

- Dynamic categories (CNAPP, CSPM, CWPP, Registry)
- Add/Remove widgets in any category
- Modal to add widgets with tabs, search, and duplication guard
- Create custom widget (name + text)
- Global search filters widgets and hides empty sections
- Local persistence (reload-safe)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Zustand (state + persistence)

## Getting Started

Prerequisites: Node 18+

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Open the app

- The terminal will print a local URL (usually `http://localhost:5173`).

## Usage

- Use the search box in the top bar to filter widgets in real time.
- Click “Add Widget” in the top bar or inside a category to open the modal.
- In the modal, pick a tab, select widgets to add, or create a custom one by entering a name and text, then click Confirm.
- Remove a widget using the cross icon on the card.

## Project Structure

- `src/store/dashboard.ts`: Zustand store, seed data, add/remove actions
- `src/components/Topbar.tsx`: Top navigation with search and Add Widget
- `src/components/CategorySection.tsx`: Category header and grid
- `src/components/WidgetCard.tsx`: Widget card with remove
- `src/components/AddWidgetModal.tsx`: Modal with tabs, search, and custom widget
- `src/data/catalog.ts`: Catalog of available widgets per tab

## Notes

- All state is saved to `localStorage` under key `accuknox-dashboard`.
- Tailwind tokens are set in `src/index.css` and extended in `tailwind.config.js`.

## Build

```bash
npm run build
npm run preview
```

