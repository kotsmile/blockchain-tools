import type { EvmConfig } from '../../config/type'
import type { Events, CallbackFunction, EventType, Filter, RawEventType } from './type'

import { log, emitMsg, toAfterEvent, toBeforeEvent } from './utils'

import state_module from '../state'

export type EventsState = {
  event: {
    listeners: {
      id: number
      event: EventType
      once: boolean
      callback: CallbackFunction
      filters: Filter<any>[]
    }[]
    listenerId: number
  }
}

export const useEvents_config = (config: EvmConfig) => {
  return () => ({
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
    async emit<Event extends RawEventType>(event: Event, args: Events[Event]['args']) {
      await this._emit(toBeforeEvent(event), args)
      await this._emit(event, args)
      await this._emit(toAfterEvent(event), args)
    },
    removeListener(listenerId: number) {
      const { update } = state_module(config)
      update('event', 'listeners', (ls) => ls.filter((l) => l.id !== listenerId))
    },
    _addListener<Event extends EventType>(
      event: Event,
      callback: (args: Events[Event]['args']) => any,
      filters: Filter<Event>[] = [],
      once = false
    ): number {
      const { update } = state_module(config)
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
    async _emit<Event extends EventType>(event: Event, args: Events[Event]['args']) {
      const { get } = state_module(config)

      const removeIds: number[] = []
      const listeners = get('event', 'listeners')

      let listenersTriggered = 0

      await Promise.all(
        listeners
          .filter((l) => l.event === event)
          .map(async (l) => {
            if (!(l.filters.some((f) => f(args)) || l.filters.length === 0)) return
            if (l.once) removeIds.push(l.id)

            listenersTriggered++
            await l.callback(args)
          })
      )

      emitMsg(event, args, listenersTriggered)
      removeIds.forEach(this.removeListener)
    },
  })
}
