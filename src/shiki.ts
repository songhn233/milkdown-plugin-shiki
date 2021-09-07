import { findChildren } from '@milkdown/utils'
import { Plugin, PluginKey } from 'prosemirror-state'
import { getDecorations } from './decorations'
import { setCDN, getHighlighter } from 'shiki'

export const key = 'MILKDOWN_PLUGIN_SHIKI'

export async function Shiki() {
  const NAME = 'fence'
  setCDN('https://unpkg.com/shiki/')
  const highlighter = await getHighlighter({
    theme: 'min-dark',
  })
  return new Plugin({
    key: new PluginKey(key),
    state: {
      init: (_, { doc }) => {
        return getDecorations(doc, highlighter, NAME)
      },
      apply: (transaction, decorationSet, oldState, state) => {
        const isNodeName = state.selection.$head.parent.type.name === NAME
        const isPreviousNodeName = oldState.selection.$head.parent.type.name === NAME
        const oldNode = findChildren((node) => node.type.name === NAME)(oldState.doc)
        const newNode = findChildren((node) => node.type.name === NAME)(state.doc)
        const codeBlockChanged =
          transaction.docChanged &&
          (isNodeName ||
            isPreviousNodeName ||
            oldNode.length !== newNode.length ||
            oldNode[0]?.node.attrs.language !== newNode[0]?.node.attrs.language)

        if (codeBlockChanged) {
          return getDecorations(transaction.doc, highlighter, NAME)
        }

        return decorationSet.map(transaction.mapping, transaction.doc)
      },
    },
    props: {
      decorations(state) {
        return this.getState(state)
      },
    },
  })
}
