import { EvmConfig } from '../../config/type'

import {
  Events,
  EventType,
  Filter,
  RawEventType,
  toAfterEvent,
  toBeforeEvent,
} from './type'
import storage_config from '../storage'
import { entries } from '../../utils/tools'
import { log } from './utils'

export default (config: EvmConfig) => {
  return {
    useEvent: () => ({
      addListener<Event extends EventType>(
        event: Event,
        callback: (args: Events[Event]['args']) => any,
        filters: Filter<Event>[] = []
      ): number {
        return this._addListener(event, callback, filters)
      },
      addListenerOnce<Event extends EventType>(
        event: Event,
        callback: (args: Events[Event]['args']) => any,
        filters: Filter<Event>[] = []
      ): number {
        return this._addListener(event, callback, filters, true)
      },
      _addListener<Event extends EventType>(
        event: Event,
        callback: (args: Events[Event]['args']) => any,
        filters: Filter<Event>[] = [],
        once = false
      ): number {
        const { update } = storage_config(config)
        const listenerId = update('event', 'listenerId', (lId) => lId + 1)
        update('event', 'listeners', (l) => [
          ...l,
          {
            id: listenerId,
            event,
            once,
            callback,
            filters,
          },
        ])
        return listenerId
      },
      removeListener(listenerId: number) {
        const { update } = storage_config(config)
        update('event', 'listeners', (ls) => ls.filter((l) => l.id !== listenerId))
      },
      async _emit<Event extends EventType>(event: Event, args: Events[Event]['args']) {
        log(`Emit ${event}`)
        const { get } = storage_config(config)

        const removeIds: number[] = []
        const listeners = get('event', 'listeners')

        await Promise.all(
          listeners
            .filter((l) => l.event === event)
            .map(async (l) => {
              if (!(l.filters.some((f) => f(args)) || l.filters.length === 0)) return
              if (l.once) removeIds.push(l.id)
              await l.callback(args)
            })
        )

        removeIds.forEach(this.removeListener)
      },
      async emit<Event extends RawEventType>(event: Event, args: Events[Event]['args']) {
        await this._emit(toBeforeEvent(event), args)
        await this._emit(event, args)
        await this._emit(toAfterEvent(event), args)
      },
      async init() {
        const stores = config.stores
        for (const [name, store] of entries(stores)) {
          console.log('add event on "init"', name)
          const initStore = async () => await store.onInit()
          this.addListener('init', initStore)
        }
        console.log('emit event "init"')
        await this._emit('init', {})
      },
    }),
  }
}

export type { Storage } from './_storage'

export type {
  AfterEvent,
  BeforeEvent,
  CallbackFunction,
  EventType,
  Events,
  Filter,
  RawEventType,
  RawEvents,
} from './type'
export { capitalize, toAfterEvent, toBeforeEvent } from './type'
