# Agent Instructions for My-Friends-App

## Project Overview

**My-Friends-App** is a simple Angular 8.2.4 application that demonstrates a friend management system. It follows the Angular Tour of Heroes tutorial pattern, showcasing CRUD operations with an in-memory database simulation.

### Tech Stack
- **Framework**: Angular 8.2.4 (legacy version)
- **CLI**: Angular CLI 8.3.2
- **Build Tool**: Webpack 4 (via @angular-devkit/build-angular 0.803.24)
- **Language**: TypeScript 3.5.3
- **Testing**: Karma + Jasmine
- **E2E**: Protractor 5.4.0
- **Linting**: TSLint 5.15.0

### Application Structure

```
src/
├── app/
│   ├── Friend.ts                    # Friend interface model
│   ├── app.module.ts                # Root module
│   ├── app-routing.module.ts        # Routing configuration
│   ├── friend.service.ts            # Friend data service (HTTP)
│   ├── messages.service.ts          # Message logging service
│   ├── in-memory-data.service.ts    # Mock backend data
│   ├── dashboard/                   # Dashboard component
│   ├── friends/                     # Friends list component
│   ├── friend-detail/               # Friend detail component
│   ├── friend-search/               # Friend search component
│   └── messages/                    # Messages display component
```

## Critical Compatibility Constraints

### Node.js Version Compatibility

⚠️ **IMPORTANT**: This is a legacy Angular 8 project with specific Node.js compatibility requirements:

- **Angular 8** uses **Webpack 4** which has issues with Node.js 17+ due to OpenSSL 3.0
- The project is configured to work with **Node.js 24** using workarounds
- All npm scripts use `cross-env NODE_OPTIONS=--openssl-legacy-provider` to handle OpenSSL compatibility

### Dependency Version Constraints

**NEVER upgrade these packages without upgrading Angular:**
- `@angular-devkit/build-angular` MUST stay at `~0.803.x` (compatible with Angular 8)
- `@angular/cli` MUST stay at `~8.3.x`
- `webpack` is indirect but constrained by build-angular version

**If Dependabot suggests upgrades:**
- For Angular packages: Only accept if upgrading the entire Angular version
- For `@angular-devkit/build-angular`: Only versions `0.803.x` are compatible with Angular 8
- Versions `21.x+` require Angular 21+ and will cause peer dependency failures

## Development Workflow

### Installation

```bash
npm install --legacy-peer-deps
```

Note: Use `--legacy-peer-deps` due to legacy package peer dependency conflicts.

### Available Commands

```bash
npm start        # Dev server on http://localhost:4200
npm run build    # Production build (source maps disabled)
npm test         # Run unit tests with Karma
npm run lint     # Lint TypeScript files with TSLint
npm run e2e      # Run end-to-end tests with Protractor
```

### Build Notes

- **Source maps are disabled** in the build script (`--source-map=false`) to avoid source-map WASM initialization issues in Node.js 18+
- Production builds use Angular CLI configurations in `angular.json`
- Output directory: `dist/friends-app/`

## Common Tasks for Agents

### Adding a New Component

```bash
npm run ng generate component component-name
```

Components follow Angular 8 conventions:
- Use `@Component` decorator
- Lifecycle hooks: `ngOnInit`, `ngOnDestroy`, etc.
- Template files use `.html`, styles use `.css`

### Working with Services

Services use Angular 8 dependency injection:
```typescript
@Injectable({
  providedIn: 'root'  // Singleton service
})
```

- HTTP operations use `HttpClient` from `@angular/common/http`
- RxJS 6.4 operators: `tap`, `catchError`, `map`, `switchMap`
- Observable patterns preferred over Promises

### Routing

- Routes defined in `app-routing.module.ts`
- Uses `RouterModule.forRoot(routes)`
- Navigation via `routerLink` directive or `Router` service

### HTTP & Mock Data

- `HttpClientInMemoryWebApiModule` simulates a backend
- Mock data in `in-memory-data.service.ts`
- API base URL: `api/friends`
- Remove InMemoryWebApiModule when connecting to real backend

## Testing

### Unit Tests (Karma + Jasmine)

```bash
npm test -- --no-watch --code-coverage=false
```

- Test files: `*.spec.ts`
- Angular testing utilities: `TestBed`, `ComponentFixture`
- Jasmine matchers: `expect()`, `toBe()`, `toEqual()`

### E2E Tests (Protractor)

```bash
npm run e2e
```

- Test files in `e2e/src/`
- Uses Selenium WebDriver
- Note: Protractor is deprecated (EOL 2023)

### Linting

```bash
npm run lint
```

- Uses TSLint (deprecated, but configured for this project)
- Rules in `tslint.json`
- Future agents should consider migrating to ESLint

## Docker Support

Dockerfile uses multi-stage build:
1. **Builder stage**: node:alpine, installs deps and builds
2. **Runtime stage**: nginx:alpine, serves static files

```bash
docker build -t friends-app .
docker run -p 80:80 friends-app
```

## Troubleshooting for Agents

### Build Failures

**"ERR_OSSL_EVP_UNSUPPORTED" error:**
- Solution: Already fixed with `NODE_OPTIONS=--openssl-legacy-provider`
- This is due to Webpack 4 + Node.js 17+ OpenSSL incompatibility

**"source-map WASM" errors:**
- Solution: Already fixed by disabling source maps in build
- Caused by source-map 0.7.3 expecting browser environment in Node.js 18+

**Peer dependency conflicts:**
- Solution: Use `npm install --legacy-peer-deps`
- Normal for legacy projects with old dependencies

### Common Pitfalls

1. **DO NOT upgrade Angular packages individually** - Angular has strict version coupling
2. **DO NOT remove `cross-env` or `NODE_OPTIONS`** - Required for Node.js 24 compatibility
3. **DO NOT enable source maps** in development - Will break with current Node.js version
4. **DO NOT use modern TypeScript features** - TypeScript 3.5.3 has limited support

## Security Considerations

⚠️ This project has **81 known vulnerabilities** in dependencies (as of last check):
- 10 low, 21 moderate, 41 high, 9 critical
- Many are in deprecated/unmaintained packages (Protractor, TSLint, etc.)
- **Recommendation**: Plan a full Angular upgrade to v12+ for security patches
- **Short-term**: Accept risk or implement workarounds for critical issues only

## Migration Path for Agents

If asked to modernize this application:

1. **Phase 1**: Upgrade to Angular 12 (first LTS with migration path from 8)
2. **Phase 2**: Replace TSLint with ESLint
3. **Phase 3**: Replace Protractor with Cypress or Playwright
4. **Phase 4**: Upgrade to latest Angular LTS (18/19)
5. **Phase 5**: Consider migrating to standalone components (Angular 14+)

## Key Files for Agents

- `package.json` - Dependencies and scripts
- `angular.json` - Build configuration
- `tsconfig.json` - TypeScript compiler options
- `karma.conf.js` - Test runner configuration
- `src/app/app.module.ts` - Root module (entry point)
- `src/app/app-routing.module.ts` - Route definitions

## API Reference

### Friend Model
```typescript
interface Friend {
  id: number;
  name: string;
}
```

### FriendService Methods
- `getFriends(): Observable<Friend[]>` - Get all friends
- `getFriend(id: number): Observable<Friend>` - Get friend by ID
- `updateFriend(friend: Friend): Observable<any>` - Update friend
- `addFriend(friend: Friend): Observable<Friend>` - Add new friend
- `deleteFriend(friend: Friend): Observable<Friend>` - Delete friend
- `searchFriends(term: string): Observable<Friend[]>` - Search friends

### MessagesService Methods
- `addmessage(message: string): void` - Add message to log
- `clear(): void` - Clear all messages

## Best Practices for Agents

1. **Follow Angular 8 patterns** - Don't use Angular 9+ features
2. **Use TypeScript strict mode** - Already configured
3. **Keep components small** - Single responsibility principle
4. **Use services for data** - Components should focus on presentation
5. **Write tests** - Unit tests for services, component tests for UI
6. **Comment your code** - This project has good inline documentation
7. **Check compatibility** - Before adding any dependency, verify Angular 8 compatibility

## Resources

- [Angular 8 Documentation](https://v8.angular.io/)
- [Angular 8 to 9 Update Guide](https://update.angular.io/?v=8.0-9.0)
- [RxJS 6 Documentation](https://rxjs.dev/api)
- [TypeScript 3.5 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html)

---

**Last Updated**: 2026-02-08  
**Project Version**: 0.0.0  
**Maintained**: Active (legacy mode)
