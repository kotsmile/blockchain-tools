import type { Namespace, Key, Value } from '../modules/storage/schema'

export type Adapter = () => {
  setValue: <N extends Namespace, K extends Key<N>, V extends Value<N, K>>(
    namespace: N,
    key: K,
    value: V
  ) => V
  getValue: <N extends Namespace, K extends Key<N>, V extends Value<N, K>>(
    namespace: N,
    key: K
  ) => V
  updateValue: <N extends Namespace, K extends Key<N>, V extends Value<N, K>>(
    namespace: N,
    key: K,
    callback: (old: V) => V
  ) => V
}
