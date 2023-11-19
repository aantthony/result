import type { Result } from '..';
import { Ok, Err } from '..';

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
