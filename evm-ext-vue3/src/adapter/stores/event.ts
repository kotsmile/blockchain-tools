import { defineStore } from 'pinia'
import type { modules } from 'evm-ext'

type EventState = modules.events.EventsState['event']

export const useEvent = defineStore<'$event', EventState>('$event', {
  state: () => ({
    listeners: [],
    listenerId: 1,
  }),
})
