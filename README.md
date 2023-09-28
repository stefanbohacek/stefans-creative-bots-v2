# Stefan's Creative Bots

![Tweetin'](https://botwiki.org/wp-content/uploads/2020/05/tweet.gif)

Built with the [creative-bots](https://glitch.com/edit/#!/creative-bots) project and powered by [Glitch](https://glitch.com). See the [showcase page](https://stefans-creative-bots.glitch.me/showcase) for a list of bots.

## FAQ and known issues

**Bots that use puppeteer stopped working.**

Be sure to update puppeteer to the [latest version](https://www.npmjs.com/package/puppeteer).


## Notes

### Support for node modules that need "require"

```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
```

### Support for "__dirname"

```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```