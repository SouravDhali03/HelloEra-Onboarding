# HelloEra Onboarding

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-222?logo=github)](https://souravdhali03.github.io/HelloEra-Onboarding/)
[![Deploy to GitHub Pages](https://github.com/SouravDhali03/HelloEra-Onboarding/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/SouravDhali03/HelloEra-Onboarding/actions/workflows/deploy-pages.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)

HelloEra Onboarding is the onboarding experience for HelloEra, a student empowerment platform. The project is being developed as a modern, accessible web experience for welcoming users and guiding them into the platform.

## Live demo

Visit the deployed application:

**https://souravdhali03.github.io/HelloEra-Onboarding/**

## Current experience

The project currently includes UI routes for:

- Landing and onboarding
- Account sign-up
- Account sign-in
- Email verification
- Password recovery
- Dashboard
- Newsfeed exploration

The application is an active work in progress, so screens and flows may continue to evolve as the HelloEra platform is developed.

## Tech stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,github" alt="Tech stack: Next.js, React, TypeScript, Tailwind CSS, and GitHub" />
</p>

- [Next.js](https://nextjs.org/) with the App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) icons
- GitHub Actions and GitHub Pages for deployment

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/SouravDhali03/HelloEra-Onboarding.git
cd HelloEra-Onboarding
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run format` | Format TypeScript and TSX files with Prettier |

## Project structure

```text
app/
├── dashboard/       # Dashboard experience
├── forgot-password/ # Password recovery
├── onboarding/      # Onboarding flow
├── sign-in/         # Sign-in experience
├── sign-up/         # Account creation
├── verify-email/    # Email verification
└── page.tsx         # Root page

components/          # Reusable UI components
features/newsfeed/   # Newsfeed feature code
hooks/               # Shared React hooks
lib/                 # Shared utilities
public/              # Static assets
```

## Universal app layout contract

The shared dashboard shell in [`components/dashboard-layout.tsx`](components/dashboard-layout.tsx)
owns the application chrome and the only page-level `<main>` landmark. The top navigation
stays separate from the shared max-width wrapper; the sidebar and module content live inside
that wrapper together.

Every module rendered inside `AppLayout` must follow these rules:

- Do not add another `<main>` element.
- Use `<section>` for a meaningful module or grouped content, with a visible heading or an accessible label.
- Use `<article>` for standalone content such as an individual blog/resource detail.
- Use `<div>` for visual layout, spacing, grids, and internal columns.
- Add a module-specific `<header>` only when the module has real introductory content. It is not required for Newsfeed or the Resources landing page.

This keeps every role and module aligned to the same sidebar, max-width, and accessibility structure.

## Deployment

The project is deployed automatically to GitHub Pages through the workflow in [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

Pushes to the `main` branch trigger a new build and deployment. Deployment status is available in the [GitHub Actions tab](https://github.com/SouravDhali03/HelloEra-Onboarding/actions).

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Run `npm run lint` and `npm run typecheck`.
4. Open a pull request with a clear summary of the changes.

## Ownership and use

Copyright © 2026 Sourav Dhali03 / HelloEra.

Unless a file states otherwise, the original source code, designs, branding, written content, and other project materials in this repository are retained by the project owner. This repository does not grant permission to copy, modify, redistribute, or use those materials commercially without prior written permission.

Use of GitHub and participation in this repository must follow [GitHub's Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service), [Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines), and applicable laws. This notice does not override the licenses of third-party dependencies or assets.

## License

No separate open-source license has been added to this repository. For permission to reuse HelloEra-specific code, designs, branding, or content, please contact the repository owner.
