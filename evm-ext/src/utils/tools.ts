export const keyOf = <O extends Record<string | number | symbol, any>>(o: O) => {
  return Object.keys(o) as (keyof O)[]
}

export const entries = <O extends Record<string | number | symbol, any>>(o: O) => {
  return Object.entries<O[keyof O]>(o)
}
