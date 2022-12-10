import type { Storage as EventStorage } from '../events'

type Storage = EventStorage

export type Namespace = keyof Storage
export type Key<N extends Namespace> = keyof Storage[N]
export type Value<N extends Namespace, K extends Key<N>> = Storage[N][K]
