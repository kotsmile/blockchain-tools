import * as rpc from './chain/rpc'
import * as chain from './chain'

import type { INotNullSigner, ISigner } from './chain/type'

export { rpc, ISigner, INotNullSigner, chain }

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
