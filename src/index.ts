/* eslint-disable no-redeclare -- intentional */
export interface Ok<T> {
  ok: true;
  val: T;
}

export interface Err<E> {
  ok: false;
  val: E;
}

export type Result<T, E> = Ok<T> | Err<E>;

interface OkConstructor {
  <T>(val: T): Ok<T>;
  (): Ok<void>;
}

const OkImpl: OkConstructor = <T>(val?: T): Ok<T> => {
  return { ok: true, val: val as T };
};

export const Ok = OkImpl as OkConstructor & (<T>(val: T) => Ok<T>);

export function Err<E>(val: E): Err<E> {
  return { ok: false, val };
}

export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type SuccessResultsAwaited<
  T extends readonly AsyncResult<unknown, unknown>[],
> = {
  [K in keyof T]: T[K] extends AsyncResult<infer TData, unknown> ? TData : T[K];
};

export type InferAsyncResultAllAwaited<
  T extends readonly AsyncResult<unknown, unknown>[],
> = Result<
  SuccessResultsAwaited<T>,
  T extends AsyncResult<unknown, infer E>[] ? E : never
>;

export interface AsyncResultConstructor {
  <T>(promise: Promise<T>): AsyncResult<T, Error>;

  all: <T extends readonly AsyncResult<unknown, unknown>[]>(
    promises: T,
  ) => Promise<InferAsyncResultAllAwaited<T>>;
}

export const AsyncResult: AsyncResultConstructor = Object.assign(
  <T>(promise: Promise<T>): AsyncResult<T, Error> => {
    return promise.then(Ok).catch((e) => Err(e as Error)) as AsyncResult<
      T,
      Error
    >;
  },
  {
    all: async <T extends readonly AsyncResult<unknown, unknown>[]>(
      promises: T,
    ): Promise<InferAsyncResultAllAwaited<T>> => {
      const results: Result<unknown, unknown>[] = (await Promise.all(
        promises,
      )) as Result<unknown, unknown>[];

      const values: unknown[] = [];

      for (const res of results) {
        if (!res.ok) {
          return res as InferAsyncResultAllAwaited<T>;
        }
        values.push(res.val);
      }

      return Ok(values as SuccessResultsAwaited<T>);
    },
  },
);
