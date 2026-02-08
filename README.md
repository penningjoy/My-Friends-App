# My Friends App

A simple friend management application built with Angular 8.2.4, demonstrating CRUD operations with an in-memory database.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Tech Stack

- **Angular**: 8.2.4 (legacy version)
- **TypeScript**: 3.5.3
- **RxJS**: 6.4.0
- **Angular CLI**: 8.3.2
- **Build Tool**: @angular-devkit/build-angular 0.803.24

## Prerequisites

- **Node.js**: Any version (optimized to work with Node.js 24+)
- **npm**: 6.x or higher

> **Note**: This is a legacy Angular 8 project configured with Node.js 24 compatibility workarounds. The build scripts include `NODE_OPTIONS=--openssl-legacy-provider` to handle OpenSSL 3.0 compatibility issues with older Webpack 4.

## Installation

```bash
npm install --legacy-peer-deps
```

> **Important**: Use the `--legacy-peer-deps` flag due to peer dependency requirements of legacy packages.

## Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/friends-app/` directory.

> **Note**: Source maps are disabled in production builds to avoid compatibility issues with Node.js 18+. To build with the `--prod` flag, use: `npm run build -- --prod`

## Running Tests

### Unit Tests

Execute the unit tests via [Karma](https://karma-runner.github.io):

```bash
npm test
```

For a single run without watch mode:

```bash
npm test -- --no-watch --code-coverage=false
```

### End-to-End Tests

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/):

```bash
npm run e2e
```

> **Note**: Protractor has been deprecated (EOL 2023). Consider migrating to Cypress or Playwright for future development.

## Linting

Run TSLint to check code quality:

```bash
npm run lint
```

## Code Scaffolding

Generate new components, services, or other Angular artifacts:

```bash
npm run ng generate component component-name
```

You can also use: `ng generate directive|pipe|service|class|guard|interface|enum|module`

## Docker Support

Build and run the application using Docker:

```bash
docker build -t friends-app .
docker run -p 80:80 friends-app
```

The Dockerfile uses a multi-stage build with Node.js Alpine for building and Nginx Alpine for serving.

## Project Structure

```
src/
├── app/
│   ├── Friend.ts                    # Friend model interface
│   ├── app.module.ts                # Root application module
│   ├── app-routing.module.ts        # Routing configuration
│   ├── friend.service.ts            # Friend data service
│   ├── messages.service.ts          # Message logging service
│   ├── in-memory-data.service.ts    # Mock backend data
│   ├── dashboard/                   # Dashboard component
│   ├── friends/                     # Friends list component
│   ├── friend-detail/               # Friend detail component
│   ├── friend-search/               # Friend search component
│   └── messages/                    # Messages display component
```

## Known Issues & Compatibility

This is a **legacy Angular 8 project** with the following compatibility considerations:

1. **Node.js Compatibility**: The project uses `cross-env` with `NODE_OPTIONS=--openssl-legacy-provider` to ensure compatibility with Node.js 17+ due to OpenSSL 3.0 changes.

2. **Dependencies**: Some dependencies have known security vulnerabilities. This is expected for a legacy project. For production use, consider upgrading to a modern Angular version (12+).

3. **Build Tool Version**: The project requires `@angular-devkit/build-angular` version `0.803.x` (compatible with Angular 8). Do not upgrade to version 21+ without upgrading Angular itself.

## Agent Instructions

For detailed development guidelines, architecture information, and troubleshooting tips, see [AGENT.md](./AGENT.md).

## Further Help

- Angular 8 Documentation: [https://v8.angular.io/](https://v8.angular.io/)
- Angular CLI: Use `ng help` or check the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)
- For migration guidance, see the [Angular Update Guide](https://update.angular.io/)

## License

This project is private and for educational purposes.
