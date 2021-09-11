import { prosePluginFactory } from '@milkdown/core'
import { Shiki } from './shiki'
import type { ShikiOption } from './shiki'

export const shiki = async (options: ShikiOption = {}) => {
  return prosePluginFactory(await Shiki(options))
}
