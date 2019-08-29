# Quick Start (with server-io-core)

In this example, we are going to use [server-io-core](https://www.npmjs.com/package/server-io-core) as the base; it is our own development server using Koa as base.

## Init project and install modules

First create your project folder. For example `jsonql-test`

Then:

```sh
$ npm init
```

After setup your `package.json`

```sh
$ npm i server-io-core jsonql-koa jsonql-client
```

## Create files for browser

Create a `public` folder and create an `index.html` inside,

```html
<!DOCTYPE>
<html lang="en">
  <head>
    <title>jsonql-test</title>
  </head>
  <body>

    <script type="text/javascript" src="jsonql-client/dist/jsonql-client.umd.js"></script>
    <script type="text/javascript" src="app.js"></script>
  </body>
</html>

```

Also create a `app.js` file, and we will come back later.

## Create index.js to run the server

Then create an `index.js` on the project root.

```js
const { join } = require('path')
const server = require('server-io-core')
// jsonql is just an Koa middleware
// server-io-core already provide the bodyparser, so we don't need to add it
const jsnoql = require('jsonql-koa')

server({
  webroot: [
    join(__dirname, 'public'),
    join(__dirname, 'node_modules')
  ],
  middlewares: [
    jsonql()
  ]
})
```
