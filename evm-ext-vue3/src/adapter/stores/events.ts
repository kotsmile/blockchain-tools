import { defineStore } from 'pinia'
import type { modules } from 'evm-ext'

type EventsState = modules.events.EventsState['events']

export const useEvents = defineStore<'$events', EventsState>('$events', {
  state: () => ({
    listeners: [],
    listenerId: 1,
  }),
})
