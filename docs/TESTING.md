# Testing Strategy

**Project:** radex-metal
**Last Updated:** 2025-11-11

## Testing Philosophy

[Overall approach to testing]

## Test Pyramid

```
     /\
    /E2E\         Few, Critical Paths
   /------\
  /  API  \       Integration Tests
 /----------\
/   Unit     \    Many, Fast, Isolated
--------------
```

## Unit Tests

### Tools
- Testing Framework: [Jest / Vitest / etc]
- Mocking: [Library]
- Coverage: [Tool]

### Coverage Goals
- Minimum: 80%
- Target: 90%

### What to Test
- Business logic
- Utility functions
- Edge cases
- Error handling

### Example
```javascript
describe('UserService', () => {
  it('should create a user with valid data', () => {
    // Test implementation
  });

  it('should throw error for duplicate email', () => {
    // Test implementation
  });
});
```

## Integration Tests

### Tools
- API Testing: [Supertest / etc]
- Database: [Test database setup]

### What to Test
- API endpoints
- Database operations
- External service integrations
- Authentication flows

### Example
```javascript
describe('POST /users', () => {
  it('should create user and return 201', async () => {
    // Test implementation
  });
});
```

## E2E Tests

### Tools
- E2E Framework: [Playwright / Cypress / etc]
- Browser: [Headless Chrome]

### What to Test
- Critical user journeys
- Happy paths
- Key workflows

### Example
```javascript
test('user can sign up and login', async () => {
  // Navigate to signup
  // Fill form
  // Submit
  // Verify redirect
  // Logout
  // Login
  // Verify dashboard
});
```

## Test Data

### Strategy
- Use factories for test data
- Seed database before tests
- Clean up after each test

### Example
```javascript
const userFactory = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: 'Test123!'
});
```

## CI/CD Integration

### Pre-commit
- Run linter
- Run unit tests

### PR Checks
- All tests pass
- Coverage threshold met
- No linting errors

### Before Deploy
- Full test suite
- E2E tests on staging

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Best Practices

1. **Isolate tests** - Each test should be independent
2. **Mock external services** - Don't rely on third-party APIs
3. **Keep tests fast** - Unit tests < 100ms
4. **Descriptive names** - Clear what is being tested
5. **One assertion per test** - Makes failures easy to debug

## Known Issues

[Document any testing challenges or limitations]

---
**Version:** 1.0
