export * as rpc from './chain/rpc'
export * as chain from './chain'
export type { INotNullSigner, ISigner } from './chain/type'
export { safe, safeRead, safeWrite } from './safe'

export const keyOf = <O extends Record<string | number | symbol, any>>(o: O) => {
  return Object.keys(o) as (keyof O)[]
}

export const entries = <O extends Record<string | number | symbol, any>>(o: O) => {
  return Object.entries<O[keyof O]>(o)
}

export const capitalize = <T extends string>(a: T): Capitalize<T> => {
  return (a[0].toUpperCase() + a.slice(1)) as Capitalize<T>
}

export const concat = <A extends string, B extends string>(a: A, b: B) =>
  `${a}${b}` as `${A}${B}`
