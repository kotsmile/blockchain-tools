import { capitalize, concat } from '../../utils'
import type { StoreLifecycle } from './type'

export const onLifecycle = <L extends StoreLifecycle>(l: L) => concat('on', capitalize(l))

const MODULE_LABEL = '[Store Module]'

export const log = (message: string) => {
  console.log(
    `%c${MODULE_LABEL} ${message}`,
    `
      color: white; 
      background: #AA0099; 
      font-weight: bold;
    `
  )
}
