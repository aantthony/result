import { readFile } from 'node:fs/promises';
import { AsyncResult } from '../src';

// res: Result<Buffer, Error>
const res = await AsyncResult(readFile('./filename.txt'));

if (res.ok) {
  console.log('File contents:', res.val);
} else {
  // Error object is the result typr
  console.log('Error reading file:', res.val.message);
}
