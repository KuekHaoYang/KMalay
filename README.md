# KMalay

KMalay is a personal, local-first Malaysian Malay vocabulary trainer built with React, TypeScript, and Vite.

It is designed around a Duolingo-like path, but the goal is not to imitate Duolingo's game design. The goal is faster vocabulary growth for one real learner using English first, then gradually shifting the interface and teaching prompts toward Malaysian Malay (`ms-MY`) until later lessons run Malay-first and eventually Malay-only.

The current app includes:

- A structured course path with 910 lessons across 78 units
- Lesson sessions with multiple exercise types
- Spiral review inside later lessons so old material keeps resurfacing
- Progressive interface language stages from English to bilingual to Malay-only
- A separate review queue with spaced repetition and continuous batch flow
- A searchable lexicon
- Manual custom vocabulary capture
- Local backup export/import
- PWA support for installable, offline-friendly use

## Why This Exists

KMalay exists because generic language apps are optimized for mass-market retention, not for one learner trying to improve Malay quickly.

This app favors:

- High-frequency daily and student vocabulary
- Short usable phrases instead of isolated dictionary junk
- Fast sessions
- Review that resurfaces weak content
- Local-first storage with no required backend

It deliberately avoids:

- Hearts or fail-state gimmicks
- Gems and social features
- Login requirements
- Backend complexity before it is needed

## Features

### Learning Flow

- `Home`: streak, XP, due review count, and next lesson
- `Path`: linear easy-to-hard lesson path
- `Lesson Session`: mixed exercise sessions for new and resurfaced content
- `Review Queue`: spaced review outside the path
- `Lexicon`: seeded course content plus custom entries
- `Settings`: export/import backup and reset local data

### Exercise Types

KMalay currently uses these exercise types:

- Meaning recognition: `MS -> EN`
- Reverse recognition: `EN -> MS`
- Typed answers
- Word bank ordering
- Pair matching

### Interface Language Progression

KMalay no longer keeps the UI in English forever.

- Early lessons are English-led
- Mid-path lessons become bilingual
- Later lessons switch to Malay-first prompts
- The final stretch uses Malay to teach Malay where Malay hints exist

### Review Model

KMalay uses two reinforcement layers:

1. `Spaced review queue`
   - Learned items get a review state.
   - Correct answers increase interval.
   - Wrong answers shrink interval and reset repetitions.

2. `Spiral review inside later lessons`
   - Later lessons do not only show brand-new items.
   - They also pull in due items and recent older items from completed lessons.
   - This prevents the path from turning into disconnected islands of vocabulary.

That second point matters. Without it, a learner can move forward and forget older words before the review queue catches them.

### Word Counting

KMalay tracks learnable Malay words by counting Malay word tokens across unique learned items.

- A single lexeme like `pengaruh` counts as 1 word
- A phrase like `kawalan politik itu ketat` counts as 4 words
- The Home screen shows learned words based on completed lessons plus custom entries
- The seeded curriculum now exceeds 5,000 learnable Malay words by that item-token count

### Lexeme Scale

The seeded deck is no longer a small starter lexicon.

- Seeded lexeme entries: `5,037`
- Seeded phrase entries: `1,135`
- Total seeded items: `6,172`

That `5,037` number is actual lexeme-entry count, not a token-count trick.

## Tech Stack

- `React 18`
- `TypeScript`
- `Vite 5`
- `React Router`
- `idb` for IndexedDB persistence
- `vite-plugin-pwa` for installable PWA support
- `Vitest` for tests

## Project Structure

High-signal files:

- `src/App.tsx`
  - App routes and top-level app shell
- `src/state/AppStateContext.tsx`
  - App state, persistence wiring, progress updates, backup import/export
- `src/data/course.ts`
  - Seeded Malay course content
- `src/lib/session.ts`
  - Lesson/review question generation and answer checking
- `src/lib/review.ts`
  - Spaced-review scheduling and streak logic
- `src/lib/storage.ts`
  - IndexedDB snapshot load/save/import/export
- `src/components/StudySession.tsx`
  - Reusable lesson/review session UI
- `src/pages/*`
  - Screen-level pages
- `vite.config.ts`
  - Vite config and PWA manifest setup

## Course Design

The seeded course is stored in `src/data/course.ts`.

Core content types:

- `Lexeme`
  - Malay text
  - English glosses
  - optional Malay teaching hint for later immersive prompts
  - accepted answers
  - tags
  - register notes
  - example text
- `Phrase`
  - short usable Malay phrase
  - optional Malay teaching hint for later immersive prompts
  - linked lexeme IDs
  - context
- `Lesson`
  - ordered lesson node in the path
- `Unit`
  - themed group of lessons

The course is intentionally biased toward:

- school life
- daily routine
- food
- transport
- shopping
- emotions
- health
- public services

This is not an exam-prep syllabus. It is a practical daily Malay syllabus.

## Local Data Model

KMalay is local-first.

Current storage behavior:

- user progress is stored in IndexedDB
- custom lexicon entries are stored locally
- review states are stored locally
- no login is required
- no server is required

Backup behavior:

- export creates a JSON snapshot
- import restores progress and custom entries

Current deployment is static. No environment variables are required for the app to run.

## Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

If your machine has npm cache permission issues, use:

```bash
npm install --cache .npm-cache
```

### 2. Start the Dev Server

```bash
npm run dev
```

Vite will print the local URL, usually something like:

```text
http://localhost:5173
```

### 3. Run Tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### 4. Type Check

```bash
npm run lint
```

### 5. Build Production Assets

```bash
npm run build
```

This outputs the production site into:

```text
dist/
```

### 6. Preview the Production Build Locally

```bash
npm run preview
```

This is useful to inspect the built app before deployment.

Important: `vite preview` is only for local previewing of the built site. It is not a production server.

## PWA Behavior

KMalay is configured as a Progressive Web App.

Current PWA behavior:

- manifest is generated during build
- service worker is generated during build
- app can be installable on supported browsers
- static assets are precached by the build

Relevant config:

- `vite.config.ts`
- `public/icon.svg`
- `public/icon-maskable.svg`
- `public/favicon.svg`

## Available Scripts

From `package.json`:

- `npm run dev`
  - start Vite dev server
- `npm run build`
  - type-check and build production assets
- `npm run preview`
  - serve the built `dist/` output locally
- `npm test`
  - run Vitest once
- `npm run test:watch`
  - run Vitest in watch mode
- `npm run lint`
  - TypeScript no-emit check

## Deployment Overview

This repository is a static Vite app.

That means deployment is simple:

- install dependencies
- run `npm run build`
- deploy the `dist/` directory

There is no server runtime, no database, and no required secrets for the current version.

If a platform asks for build settings manually, use:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

## Deploy Locally

There are two useful local deployment-style workflows:

### Option A: Standard local development

```bash
npm install
npm run dev
```

Use this during active development.

### Option B: Production-like local preview

```bash
npm install
npm run build
npm run preview
```

Use this when you want to verify the final built app.

### Option C: Cloudflare Pages-style local preview

If you want to emulate Cloudflare Pages static serving locally:

```bash
npm run build
npx wrangler pages dev dist
```

This is optional. For this project, `npm run preview` is usually enough.

## Deploy to Vercel

KMalay deploys cleanly to Vercel because it is a static Vite app.

### Method 1: Vercel Dashboard via Git

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Vercel should detect Vite automatically.
4. If Vercel asks for manual settings, use:
   - Framework Preset: `Vite`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy.

After that:

- pushes to non-production branches create preview deployments
- pushes to the production branch create production deployments

### Method 2: Vercel CLI

Install the CLI:

```bash
npm i -g vercel
```

If you are not already authenticated, Vercel CLI will prompt you to log in.

Deploy from the project root:

```bash
vercel
```

That creates a Vercel deployment and links the local directory to the Vercel project.

To create a production deployment directly:

```bash
vercel --prod
```

### Recommended Vercel Flow

Use Git-based deployment unless you have a reason not to.

Why:

- preview deployments on branch pushes
- easier rollback workflow
- no manual CLI deploy step for every change

## Deploy to Cloudflare Pages

KMalay also deploys cleanly to Cloudflare Pages because it is just static built assets.

You have two realistic choices:

- Git integration
- Direct Upload with Wrangler

### Method 1: Cloudflare Pages via Git

1. Push the repo to GitHub or GitLab.
2. In Cloudflare Dashboard, open `Workers & Pages`.
3. Create a new `Pages` project from Git.
4. Select the repository.
5. If Cloudflare asks for build settings, use:
   - Framework preset: `Vite` if available
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Save and deploy.

After that:

- branch pushes can generate preview deployments
- the production branch can auto-deploy to production

### Method 2: Cloudflare Pages Direct Upload with Wrangler

Build the project first:

```bash
npm install
npm run build
```

Create a Pages project:

```bash
npx wrangler pages project create
```

If Wrangler is not authenticated yet, authenticate first:

```bash
npx wrangler login
```

Then deploy the built assets:

```bash
npx wrangler pages deploy dist
```

For preview branch deployments:

```bash
npx wrangler pages deploy dist --branch=preview-name
```

### Method 3: Cloudflare Direct Upload from CI

If you want CI/CD without Git integration on Pages, deploy prebuilt assets with Wrangler:

```bash
CLOUDFLARE_ACCOUNT_ID=<ACCOUNT_ID> npx wrangler pages deploy dist --project-name=<PROJECT_NAME>
```

Your CI environment also needs Cloudflare authentication configured for Wrangler. Without that, direct upload will fail.

That method is useful when:

- you want custom CI pipelines
- you want direct upload instead of Git-integrated Pages builds

### Recommended Cloudflare Flow

For normal use, Git integration is cleaner.

Use Direct Upload only if you specifically want:

- external CI
- manual prebuilt uploads
- Wrangler-based deployment control

## Vercel vs Cloudflare Pages

For this repository as it currently exists:

- `Vercel`
  - very low friction
  - good preview deployment workflow
  - easy for static frontend hosting

- `Cloudflare Pages`
  - also low friction
  - very good if you later want Pages Functions, Workers, D1, or other Cloudflare-native services
  - direct upload workflow is stronger than many competitors

There is no hard technical reason to prefer one for the current version. This app is static and will work fine on either platform.

## Changing the Course

If you want to extend or edit the seeded curriculum:

1. Edit `src/data/course.ts`
2. Keep IDs unique
3. Make sure every lesson references real item IDs
4. Run tests:

```bash
npm test
```

5. Rebuild:

```bash
npm run build
```

The content validator test will catch:

- duplicate item IDs
- duplicate lesson IDs
- missing item references
- missing lesson references

## Troubleshooting

### `npm install` fails with cache permission errors

Use:

```bash
npm install --cache .npm-cache
```

### Build succeeds but the deploy is blank

Check:

- the platform is deploying `dist/`
- the build command is `npm run build`
- the install command is `npm install`

### `npm run preview` works, but the cloud deploy does not

That usually means your hosting platform is misconfigured, not the app.

For this repo, the most likely mistake is wrong output directory or wrong build command.

### I want a backend later

Current app is static.

If you later add:

- sync
- auth
- remote backups
- analytics
- teacher/admin tools

then hosting and architecture decisions may change.

## Current Status

Implemented now:

- 370 seeded lessons
- local-first progress
- review scheduler
- spiral resurfacing inside later lessons
- staged UI language progression into Malay immersion
- Home screen learned-word counter
- continuous review flow without the old stop-start result screen
- custom lexicon capture
- export/import backups
- PWA build

Not implemented yet:

- audio/listening drills
- cloud sync
- multi-user accounts
- remote analytics
- teacher/admin workflows

## License / Usage

This project is currently built for personal use.

If you want to open-source it later, add a real license file instead of assuming one exists.
