# Science Live Lab

Interactive physics and math lesson notes built with Next.js, migrated from standalone HTML files.

## Project Structure

```
physics-notes/
  app/
    layout.tsx              # Root layout (fonts, MathJax, KaTeX)
    page.tsx                # Homepage - lists all topics
    globals.css             # Global styles (Tailwind + custom)
    topics/[slug]/
      page.tsx              # Dynamic route (SSG with generateStaticParams)
      TopicPageClient.tsx   # Client renderer (injects interactive components)
  components/
    Navigation.tsx          # Shared sidebar navigation with scroll spy
    TopicCard.tsx            # Homepage topic card
    MathBlock.tsx            # MathJax wrapper component
    ConceptSection.tsx       # Reusable section layout
    InfoCard.tsx             # Colored info/note card
    algebra/                # Algebra-specific interactive components
    conical/                # Parametric circle & parabola inversion
    injective/              # Function definition cards
    orbital/                # Kepler's laws, ellipse, gravity calculators
    thermodynamics/         # Temperature simulator, heat calculators
  content/
    topics/                 # MDX files (one per topic)
      algebra-explorer.mdx
      conical-inverse-functions.mdx
      injective-functions.mdx
      orbital-mechanics.mdx
      thermodynamics.mdx
    metadata.json           # Topic index
  lib/
    mdx.ts                  # MDX file reading utilities
```

## How to Run

```bash
cd physics-notes
npm install
npm run dev       # Development server at http://localhost:3000
npm run build     # Static export to /out directory
```

## How to Add a New Topic

1. Create a new MDX file in `content/topics/your-topic.mdx` with frontmatter:

```yaml
---
title: "Your.Lab"
description: "Short description"
category: "math"          # or "physics"
topics: ["tag1", "tag2"]
difficulty: "intermediate"
lastUpdated: "2026-02-16"
color: "teal"
icon: "🔬"
navSections:
  - id: "intro"
    label: "Introduction"
  - id: "section1"
    label: "Section 1"
---
```

2. Write content using HTML sections with `id` attributes matching `navSections`.
   Insert interactive components using `<<<ComponentName>>>` markers.

3. If your topic needs interactive components, create them in `components/your-topic/` as `"use client"` components and register them in `TopicPageClient.tsx` in the `componentMap`.

4. Update `content/metadata.json` with the new topic entry.

5. Run `npm run build` to verify.

## Tech Stack

- **Next.js 16** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- **MathJax 3** (LaTeX rendering via CDN)
- **Chart.js** (interactive charts via CDN)
- **Plotly.js** (3D surface plots via CDN)
- **Canvas API** (orbital animations)

## Migrated Topics

| Original HTML File | Topic Slug | Category |
|---|---|---|
| algebra_explorer.html | algebra-explorer | Math |
| conical-inverse-funcs.html | conical-inverse-functions | Math |
| summary_injective_funcs.html | injective-functions | Math |
| orbital_mechanics_explorer.html | orbital-mechanics | Physics |
| thermodynamics_explorer.html | thermodynamics | Physics |
