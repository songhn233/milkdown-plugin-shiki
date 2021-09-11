import { Editor, defaultValueCtx } from '@milkdown/core'
import { marks, nodes } from '@milkdown/preset-commonmark'
import { nord } from '@milkdown/theme-nord'
import { slash } from '@milkdown/plugin-slash'
import { shiki } from '../src/index'

import './style.css'

const markdown = `
# Milkdown Test

## Blockquote

> Milkdown is an editor.

## Marks Paragraph

Hello, ***milkdown* nice \`to\` meet *you***!  
There should be a line break before this.

\`\`\`typescript
const shiki = require('shiki') 
shiki.getHighlighter({
  theme: 'nord'
}).then(highlighter => {
  console.log(highlighter.codeToHtml(\`console.log('shiki');\`, 'js'))
})

// <pre class="shiki" style="background-color: #2e3440"><code>
//   <!-- Highlighted Code -->
// </code></pre>
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
  .use(await shiki())
  .create()
