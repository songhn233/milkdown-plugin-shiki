/* eslint-disable @typescript-eslint/no-var-requires */
import { findChildren } from '@milkdown/utils'
import { Node } from 'prosemirror-model'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { setCDN, getHighlighter } from 'shiki'

export type FlattedNode = {
  content: string
  color: string
}

export function getDecorations(doc: Node, name: string) {
  const decorations: Decoration[] = []

  setCDN('https://unpkg.com/shiki/')

  findChildren((node) => node.type.name === name)(doc).forEach(async (block) => {
    let from = block.pos + 1
    const { language } = block.node.attrs
    if (!language) return
    const highlighter = await getHighlighter({
      theme: 'nord',
    })
    const nodes = highlighter
      .codeToThemedTokens(block.node.textContent, language)
      .flat()
      .map(
        ({ content, color }) =>
          ({
            content,
            color,
          } as FlattedNode),
      )
    console.log(nodes)
    nodes.forEach((node) => {
      const to = from + node.content.length
      const decoration = Decoration.inline(from, to, {
        style: node.color,
      })
      decorations.push(decoration)
      from = to
    })
  })
  return DecorationSet.create(doc, decorations)
}

// export type FlattedNode = {
//   text: string
//   className: string[]
// }

// const flatNodes = (nodes: RefractorNode[], className: string[] = []) =>
//   nodes.flatMap((node): FlattedNode[] =>
//     node.type === 'element'
//       ? flatNodes(node.children, [...className, ...(node.properties.className || [])])
//       : [{ text: node.value, className }],
//   )

// export function getDecorations(doc: Node, name: string) {
//   const decorations: Decoration[] = []

//   findChildren((node) => node.type.name === name)(doc).forEach((block) => {
//     let from = block.pos + 1
//     const { language } = block.node.attrs
//     if (!language) return
//     const nodes = highlight(block.node.textContent, language)

//     flatNodes(nodes).forEach((node) => {
//       const to = from + node.text.length

//       if (node.className.length) {
//         const decoration = Decoration.inline(from, to, {
//           class: node.className.join(' '),
//         })

//         decorations.push(decoration)
//       }

//       from = to
//     })
//   })
//   return DecorationSet.create(doc, decorations)
// }
