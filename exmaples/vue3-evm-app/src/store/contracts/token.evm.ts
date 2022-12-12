import { defineStore } from 'pinia'
import { useEvm } from '@/evm.config'
import { safeRead } from 'evm-ext'

const { useContracts } = useEvm()

export const useToken = defineStore('token', {
  state: () => ({
    loading: false,
    symbol: 'TKN',
  }),
  actions: {
    async onInit() {
      const { token } = useContracts()
      this.symbol = await safeRead(token.symbol())
      return true
    },
  },
})
