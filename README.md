# ts-simple-result

Typescript "Result" types.

Types for handling errors and exceptions in a functional way.

Example usage:

```typescript
import { Result, Ok, Err } from 'ts-simple-result';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Err('Cannot divide by zero');
  }
  return Ok(a / b);
}

const result = divide(10, 2);
if (result.ok) {
  console.log('Result is', result.val);
} else {
  console.log('Error is', result.val);
}
```

All types used by this library are simple object types (no classes) so they can easily be passed around and serialized -- This library is designed primarily for use in Next.js Server Actions, and to have a simple, stable API.

## API

### Result

There are two ways to create a result:

```typescript
const yes = Ok(42);
const no = Err('Nope');

// Both of these are valid Result<number, string> types
const results: Result<number, string>[] = [yes, no];
```

There is additionally an `AsyncResult` defined which is the following:

```typescript
export type AsyncResult<T, E> = Promise<Result<T, E>>;
```

Using AsyncResult keeps function declarations short.

### Convenience functions

## AsyncResult

Returns a promise that resolves to a Result containing Ok(resolved) or Err(rejected).

```typescript
// res: Result<Buffer, Error>
const res = AsyncResult(readFile('./filename.txt'));

if (res.ok) {
  console.log('File contents:', res.val);
} else {
  // Error object is the result typr
  console.log('Error reading file:', res.val.message);
}
```

## AsyncResult.all

Similar to `Promise.all(...)` but returns an `AsyncResult`, which contains an array of results, or an error if any of the promises fail.

```typescript
const res = AsyncResult.all([
  readFile('./file1.txt'),
  readFile('./file2.txt'),
  readFile('./file3.txt'),
]);

if (res.ok) {
  console.log('Files array:', res.val);
} else {
  console.log('Error reading file:', res.val.message);
}
```
