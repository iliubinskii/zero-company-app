# Zero Company App

## Table of Contents

- [Initial Setup](#initial-setup)
- [Development](#development)
- [Contributions](#contributions)
- [How To](#how-to)

## Initial Setup

1. Clone the repository.
2. Git configuration for line breaks:
   - `git config core.autocrlf true`
   - `git config core.eol lf`
   - `git add --renormalize .`
3. Install dependencies by running `npm install`.
4. Create a `.env` file (see `.env.example`).
5. Add SSL certificates or generate them by running `npm run dev`:
   - `certificates/localhost.pem`
   - `certificates/localhost-key.pem`

## Development

Option 1:

1. Start https development server by running `npm run dev`
2. Server runs on [https://localhost:3100](https://localhost:3100) (see .env.example)

Option 2:

1. Start http development server by running `npm run dev-http`
2. Start SSL proxy server by running `npm run dev-proxy`
3. Server runs on [https://localhost:3100](https://localhost:3100) (see .env.example)

## Contributions

1. Create a new feature branch `feature/<hyphened-branch-name>`.
2. Make your changes.
3. Format code by running `npm run format`.
4. Commit and push your changes.
5. Create a PR.

## How To

### Disable all checks for entire file

```javascript
/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
// @ts-nocheck
```
