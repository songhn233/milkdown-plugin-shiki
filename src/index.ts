import { prosePluginFactory } from '@milkdown/core'

import { Shiki } from './shiki'

export const shiki = prosePluginFactory(await Shiki())
