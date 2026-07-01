# Article Listing Web Application

A Nuxt 3 app that pulls articles from a mock API and shows them as a list or a grid, with a detail page for each one. Built server-rendered, mobile-first, and with a fair amount of thought put into what happens when things go wrong (missing fields, failed requests, slow networks, broken images).

## Getting it running

You'll need Node 18+ and npm 9+.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run preview   # preview that build locally
npm test          # unit tests (Vitest)
npm run typecheck # vue-tsc, strict mode
npm run lint      # ESLint
```

You don't need to set up any environment variables to run it — `nuxt.config.ts` already has a working API URL baked in, and the server just uses port 3000 by default. If you want to point it at a different endpoint or run it on another port, copy `.env.example` to `.env` and set `NUXT_PUBLIC_ARTICLES_API_URL` and/or `PORT`.

## How it's organized

```
components/
  common/     - AppHeader, AppErrorBoundary
  ui/         - UiButton, UiSkeletonCard, UiEmptyState, UiErrorMessage (no business logic in these)
  articles/   - ArticleImage, ArticleListCard, ArticleGridCard, ArticleDetailHeader
composables/
  useAPI.ts       - the only place that talks to the network
  useArticles.ts  - fetches, maps, and writes into the store
  useViewMode.ts  - list/grid preference, saved to localStorage
models/
  api/        - the raw shape the API actually returns
  domain/     - the cleaned-up shape everything else in the app uses
pages/
  index.vue              - the article list, at /
  articles/[id].vue        - a single article, at /articles/:id
stores/
  articles.store.ts  - articles, isLoading, error - that's it
utils/
  id.ts       - turns a url into a route-friendly id and back
  date.ts     - the two date formats the design needed (absolute and relative)
  mappers.ts  - raw API record -> the domain model, with fallbacks for missing fields
types/
  index.ts    - just the ViewMode type
tests/        - Vitest tests, mirroring utils/ and stores/
```

## How the API layer is put together

Everything network-related goes through `useAPI.ts`. It wraps Nuxt's `useFetch`, fetches on the server so the page has real data on first paint, and dedupes so a client-side call for the same data doesn't refire on top of what SSR already fetched. It's also written so it can't throw - a failed request and a 200 with a weird body both come back as the same `{ data, error }` shape, just with different error text.

`useArticles.ts` sits on top of that. It's the one that actually maps raw API data into the domain model and pushes it into the Pinia store, and it checks first whether the store already has articles before fetching again - which is what stops the app from re-fetching every time you go from the list to a detail page and back.

Pages don't touch `useFetch` or `useAPI` directly, only `useArticles()`. Keeping that boundary meant I only had to think about "what if the network fails" in one place instead of scattered across every page.

## Why the models are split the way they are

The mock API turned out to return a NewsAPI-shaped response (`status`, `totalResults`, an `articles` array), not the flat shape I'd originally assumed while writing the plan. There's no `id` anywhere, no category or tags, and fields like `author`, `title`, `description` and `urlToImage` are genuinely missing on some records - not hypothetically, I checked the live data.

That's the reason for two separate models: `models/api` mirrors exactly what comes back over the wire (mostly optional fields, because that's reality), and `models/domain` is the shape the rest of the app actually works with, where everything has a sensible default. All of that normalizing happens in one function, `mapArticle`, instead of being sprinkled as `?? 'fallback'` checks through every component.

Since there's no id field, I used the article's `url` as its identity - it's the only thing guaranteed unique - and base64url-encode it for the route param in `utils/id.ts`.

No `any` anywhere in the codebase. Strict mode is on in `nuxt.config.ts`, and `eslint.config.mjs` treats `@typescript-eslint/no-explicit-any` as an error, not a warning.

## How errors are handled

Network and parsing failures get caught inside `useAPI` and turned into a plain-language message - the UI never sees a raw error object. `useArticles` is what actually sets `store.error` when something goes wrong. From there the page just reads `store.error` and shows the error screen with a retry button - and I made that broader than just "no internet," since a malformed response from the API is just as real a failure mode as a dropped connection.

Missing fields get their defaults once, in the mapper (`'Untitled Article'`, `'No description available.'`, and so on), so nothing downstream has to check for `undefined`. An empty result set is treated differently from an error - if the API genuinely returns zero articles, that's a normal empty state, not a failure. And if someone lands on a detail page for an id that doesn't match anything, that's a 404-style "not found" state rather than a crash.

There's no `try/catch` in any page or component - it's all handled in the composable layer. `AppErrorBoundary` is there as a last line of defense for anything unexpected that slips through.

## Assumptions I made along the way

- The API's real shape doesn't match what the original brief assumed, so I built against what it actually returns rather than the documented guess.
- There's no id in the data, so `url` became the identity field instead.
- The Figma screens never show an author or a category badge anywhere, so I didn't model or render either, even though earlier notes mentioned them.
- The list/grid toggle shown across two of the Figma frames is a real feature here, not just two static mockups of the same screen.
- The offline/error screen shows up for any failed fetch, not only when the browser is actually offline.
- Desktop is the same mobile-first components reflowed into more columns, not a separate desktop design.

## What I'd do with more time

- Component and end-to-end tests - right now the tests only cover the pure functions and the store, nothing that renders.
- Real `navigator.onLine` detection, so a genuinely offline user sees different messaging than someone hitting a broken API.
- Something like `nuxt-image` for the article thumbnails instead of plain `<img>` tags.
- Pagination or virtualization, if the dataset ever grows past the ~79 articles the mock API returns today.
- Actually deploying it somewhere (Vercel/Netlify) with lint/typecheck/test/build running in CI on every push.
