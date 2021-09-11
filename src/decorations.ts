/* eslint-disable @typescript-eslint/no-var-requires */
import { findChildren } from '@milkdown/utils'
import { Node } from 'prosemirror-model'
import { Decoration, DecorationSet } from 'prosemirror-view'
import type { Highlighter } from 'shiki'

export type FlattedNode = {
  content: string
  color: string
}

export function getDecorations(doc: Node, highlighter: Highlighter, name: string) {
  const decorations: Decoration[] = []

  findChildren((node) => node.type.name === name)(doc).forEach(async (block) => {
    let from = block.pos + 1
    const { language } = block.node.attrs
    if (!language) return
    const nodes = highlighter.codeToThemedTokens(block.node.textContent, language).map((token) =>
      token.map(
        ({ content, color }) =>
          ({
            content,
            color,
          } as FlattedNode),
      ),
    )
    nodes.forEach((block) => {
      block.forEach((node) => {
        const to = from + node.content.length
        const decoration = Decoration.inline(from, to, {
          style: `color: ${node.color}`,
        })
        decorations.push(decoration)
        from = to
      })
      from += 1
    })
  })
  return DecorationSet.create(doc, decorations)
}
