# @alepop/stencil-env

This package is used to use env variables from `.env` file in your stencil project files.

First, npm install within the project:

```
npm install @alepop/stencil-env --save-dev
```

Next, within the project's `stencil.config.js` file, import the plugin and add
it to the `plugins` config.

#### stencil.config.ts
```ts
import { Config } from '@stencil/core';
import { env } from '@alepop/stencil-env';

export const config: Config = {
  plugins: [
      env()
  ]
};
```
You can additionally, pass [options](https://github.com/motdotla/dotenv#options) to the `env` plugin.

Add `.env` file in the root of your project

### .env
```bash
TEST=test string
```

After compilation, `process.env.TEST` will be replaced by it variable from `.env` file.

### Gotchas
You should to take in mind that `process.env` will not exist as usable object in your project when you use this plugin. It's only replace exact `.env` variable with it's value on a build phase.

## Related

* [Stencil](https://stenciljs.com/)
* [Stencil Worldwide Slack](https://stencil-worldwide.slack.com)
* [dotenv](https://github.com/motdotla/dotenv)
