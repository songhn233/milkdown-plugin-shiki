import { prosePluginFactory } from '@milkdown/core'

import { Shiki } from './shiki'

export const shiki = prosePluginFactory(Shiki())

// import { prosePluginFactory } from '@milkdown/core'

// import { Prism } from './prism'

// export const prism = prosePluginFactory(Prism('fence'))
