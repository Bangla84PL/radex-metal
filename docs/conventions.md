# Coding Conventions

**Project:** radex-metal
**Last Updated:** 2025-11-11

## General Principles

1. **Readability over cleverness**
2. **Consistency over personal preference**
3. **Explicit over implicit**
4. **Simple over complex**

## Code Style

### TypeScript/JavaScript

**Naming Conventions:**
- Variables: `camelCase`
- Functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private properties: `_leadingUnderscore`

**File Naming:**
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Tests: `[filename].test.ts`

**Formatting:**
- Indentation: 2 spaces
- Line length: 100 characters max
- Semicolons: Required
- Quotes: Single quotes for strings
- Trailing commas: Yes

**Example:**
```typescript
const MAX_RETRIES = 3;

class UserService {
  private _cache: Map<string, User>;

  async getUserById(id: string): Promise<User> {
    // Implementation
  }
}
```

### CSS/Styling

**Class Naming:** BEM or Tailwind
```css
.block__element--modifier {}
```

**Order of Properties:**
1. Positioning
2. Box model
3. Typography
4. Visual
5. Misc

## Project Structure

### Directory Organization
```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific modules
├── lib/            # Shared utilities
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

### File Organization
1. Imports (external → internal)
2. Type definitions
3. Constants
4. Main component/function
5. Helper functions
6. Exports

**Example:**
```typescript
// External imports
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Internal imports
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// Types
interface Props {
  userId: string;
}

// Constants
const DEFAULT_PAGE_SIZE = 20;

// Main component
export function UserProfile({ userId }: Props) {
  // Implementation
}

// Helper functions
function validateUserId(id: string): boolean {
  // Implementation
}
```

## Best Practices

### Functions
- Single responsibility
- Max 20 lines (guideline, not rule)
- Descriptive names
- Early returns

### Comments
- Explain WHY, not WHAT
- Update when code changes
- Use JSDoc for public APIs

```typescript
/**
 * Calculates user's subscription renewal date.
 * Takes into account trial periods and grace periods.
 *
 * @param user - The user object
 * @returns ISO date string of renewal date
 */
function calculateRenewalDate(user: User): string {
  // We add 3 days grace period as per business requirement
  const gracePeriod = 3 * 24 * 60 * 60 * 1000;
  // ...
}
```

### Error Handling
- Use custom error classes
- Always handle errors
- Log errors with context
- Return meaningful messages

```typescript
try {
  await riskyOperation();
} catch (error) {
  logger.error('Failed to process payment', {
    userId: user.id,
    error: error.message
  });
  throw new PaymentError('Payment processing failed', { cause: error });
}
```

### Async/Await
- Prefer async/await over promises
- Handle errors with try/catch
- Use Promise.all for parallel operations

## Git Practices

### Branch Naming
- `feature/user-auth`
- `bugfix/login-error`
- `hotfix/critical-bug`
- `docs/api-documentation`

### Commit Messages

**Format:** `type(scope): message`

**Types:**
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

**Examples:**
```
feat(auth): add password reset functionality
fix(api): handle null user in getUserById
docs(readme): update installation instructions
```

### Pull Requests
- Descriptive title
- Reference issue number
- Description of changes
- Screenshots for UI changes
- Tests added/updated

## Testing Conventions

### Test Structure
```typescript
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when found', () => {
      // Arrange
      // Act
      // Assert
    });

    it('should throw error when not found', () => {
      // Test
    });
  });
});
```

### Test Naming
- Descriptive: what is being tested
- Include expected behavior
- Use "should" language

## Security

### Never Commit
- API keys
- Passwords
- Private keys
- .env files

### Always Validate
- User input
- File uploads
- API responses

### Use
- Parameterized queries (prevent SQL injection)
- Content Security Policy
- HTTPS everywhere
- Rate limiting

---
**Version:** 1.0
