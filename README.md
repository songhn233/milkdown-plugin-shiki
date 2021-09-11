# @milkdown/plugin-shiki

Shiki plugin for [milkdown](https://saul-mirone.github.io/milkdown/).
Add support for [shiki highlight](https://shiki.matsu.io/).

## Example Usage

```typescript
import { Editor } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';

import { shiki } from 'milkdown-plugin-shiki';

Editor.make()
  .use(nord)
  .use(commonmark)
  .use(await shiki())
  .create();
```

## Options

```typescript
Editor.use(await shiki({
  theme: 'min-dark',
  cdn: 'https://unpkg.com/shiki/',
  otherLangs: ['tsx', 'jsx']
}))
```

More infomaion about themes and langs config can be found in [shiki docs](https://shiki.matsu.io/).