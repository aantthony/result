/* eslint-disable no-console -- example */
import { readFile } from 'node:fs/promises';
import { AsyncResult, Err, Ok } from '../src';

enum FileErrorCode {
  NotFound = 'notfound',
}

async function getFile(path: string): AsyncResult<Buffer, FileErrorCode> {
  const res = await AsyncResult(readFile(path));
  if (!res.ok) {
    return Err(FileErrorCode.NotFound);
  }
  9;
  return Ok(res.val);
}

const res = await AsyncResult.all([
  getFile('./file1.txt'),
  getFile('./file2.txt'),
  getFile('./file3.txt'),
]);

if (res.ok) {
  console.log('array of buffers:', res.val);
} else {
  console.log('Error reading file:', res.val);
}
