# bear-book

A web browser client-only address book. Implemented with as little dependencies as possible. Main purpose is to serve as reference for [bearmentor.com](https://bearmentor.com) mentees.

## tech

### product

- HTML
  - module scripts
- CSS
- JavaScript
  - fetch
  - ESM imports
- Web Storage
  - localStorage
  - IndexedDB

### tool

- mise for additional tool and task runner (if any, see [`mise.toml`](./mise.toml))
- `node:test` for helpers and `node --test` for test runner
- JSDoc to have typehints, while not requiring build step
- Netlify for deployment (see [`netlify.toml`](./netlify.toml))
- `npx http-server` for local development, but you can use any local server ([see this gist](https://gist.github.com/willurd/5720255)), more about this later

## running

Uhh... if you have mise, things should be set up for you. Otherwise, you should have node v24.

### development

Because we use module scripts (`<script type="module">`), opening the `index.html` directly using `file:///` protocol wouldn't work for CORS reasons.[^js-module-cors]

```sh
$ npx http-server src -c-1
```

### test

```sh
$ node --test
```

## references

[^js-module-cors]: https://github.com/mdn/content/blob/59433be3814da9b599782af543eabccab071c81e/files/en-us/web/javascript/guide/modules/index.md?plain=1#L411
