# Zero Company App

## Initial setup

1. Fork repository.
2. Clone your forked repository.
3. Install dependencies by running `npm install`.
4. Create .env file (see .env.example)
5. Add SSL certificates
   - certificates/localhost.pem
   - certificates/localhost-key.pem

## Development

Option 1:

1. Start https development server by running `npm run dev-https`

Option 2:

1. Start http development server by running `npm run dev-http`
2. Start SSL proxy server by running `npm run dev-proxy`

## Contributions

1. Create a new feature branch `feature/<hyphened-branch-name>`.
2. Make your changes.
3. Format code by running `npm run format`.
4. Commit and push your changes (commit should pass validation).
5. Create a PR.

## TODO

- Add authors in package.json
- Decide whether repo is private or public
