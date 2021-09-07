import { Editor, defaultValueCtx } from '@milkdown/core'
import { marks, nodes } from '@milkdown/preset-commonmark'
import { nord } from '@milkdown/theme-nord'
import { slash } from '@milkdown/plugin-slash'
import { shiki } from '../src/index'
import 'prismjs/themes/prism.css'

import './style.css'

const markdown = `
# Milkdown Test

## Blockquote

> Milkdown is an editor.

## Marks Paragraph

Hello, ***milkdown* nice \`to\` meet *you***!  
There should be a line break before this.

\`\`\`typescript
console.log('Hello, milkdown!')
function test() {
  console.log('hello')
}
\`\`\`

`

const root = document.getElementById('app')

if (!root) throw new Error()

new Editor()
  .config((ctx) => {
    ctx.set(defaultValueCtx, markdown)
  })
  .use(nord)
  .use(nodes)
  .use(marks)
  .use(slash)
  .use(shiki)
  .create()
