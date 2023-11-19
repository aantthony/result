import type { Result } from '../src';
import { Err, Ok } from '../src';

const yes = Ok(42);
const no = Err('Nope');

// Both of these are valid Result<number, string> types
const results: Result<number, string>[] = [yes, no];
