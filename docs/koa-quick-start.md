# Quick Start (with server-io-core)

In this example, we are going to use [server-io-core](https://www.npmjs.com/package/server-io-core) as the base; it is our own development server using Koa and socket.io

## Init project and install modules

First create your project folder. For example `jsonql-test`

Then:

```sh
$ mkdir jsonql-test && cd jsonql-test && npm init
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

Also create an file call `app.js`, we will come back to work on it later.

## Create index.js to run the server

Then create `index.js` on the project root.

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

You can add an entry to the `package.json`

```json
{
  "scripts": {
    "start": "node ./index.js"
  }
}
```

We will come back to this later

## Setup resolvers

Now create a folder call `resolvers` and another folder call `contracts`
on your project root.

Then inside your `resolvers` folder create a folder call `query`

Let's create our first resolver, create a new file call `get-something.js` inside the `resolvers/query` folder

Then put something like this

```js
/**
 * a simple query resolver
 * @param {string} msg some message
 * @return {string} a reply
 */
module.exports = function getSomething(msg) {
  // you can play a word game
  switch (msg) {
    case 'hi':
      return 'Ola!'
    case 'bye':
      return 'Adios'
    default:
      return `Did you say "${msg}"?`
  }
}

```

## Working with browser client

Open the `app.js` in your editor, and add the following code:

```js
// app.js
// once you include the jsonql-client.umd.js in the HTML
// jsonqlClient will be available globally
(function() {
  jsonqlClient()
    .then(function(client) {
      // lets make this client available to other code outside
      // of this IIFE
      window.jsonqlClientInstance = client;
      // let's do a hello world
      client.query.helloWorld()
        .then(function(msg) {
          alert(msg)
        })
        .catch(function(error) {
          // always a good practice to handle the error yourself!
          console.error('HelloWorld Error', error)
        })
    })
})()
```

Now go back to your console, remember we add the line in the `package.json`? Now we can execute the setup via:

```sh
$ npm start
```

Your default browser should open, and a message prompt greet you with the query result.

## Exercise

Try to call the resolver you just created.

*Hint* The naming convention is camel case all the functions. So your file name is `get-something.js` then your query resolver is `getSomething`.

---

There will be more in this chapter (last updated 30 Aug 2019, Joel Chu)
