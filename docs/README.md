# jsonql introduction

> This is a huge collection of modules that help you to create API quickly.

This is **not** a replacement of REST or GraphQL, instead we are focus on the _last one mile_.

The communication protocol is based on [JSON API](https://jsonapi.org/).

It's intend for communication between different devices or services.

The core idea is like this:

<pre>

  client <---> contract <---> server

</pre>

You write the resolver (on server side) once, then
the client tool will grab the `contract.json` then generate relevant code.

For example:

```js
// server side node.js using our jsonql koa middleware
// using CJS

/**
 * You must write correct jsdoc comment, otherwise jsonql contract generator will throw error
 * @param {string} msg input
 * @return {string} output
 */
module.exports = function saySomething(msg) {
  return `I got your message: ${msg}`
}
```

Then on the client side:

```js
// using Promise
jsonqlClient()
  .then(client => {
    client
      .query
      .saySomething(`Hello there`)
      .then(result => {
        console.log(result)
      })
  })
```

To better understand how all this put together, please clone this [demo repo](https://github.com/joel-chu/jsonql-demo) and play around with it.

# Query / Mutation / Auth

There are only three types of calls. `query`, `mutation` and `auth` (there are the fourth one `socket` in separate modules)

## Query aka getter

TBC

## Mutation aka setter

TBC

## Auth - protect your call with JWT

TBC

# jsonql-koa configuration

At the moment, our core server side setup is node.js with [Koa](https://koajs.com/)

```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const jsonql = require('jsonql-koa')

const app = new Koa()
app.use(bodyparser())
app.use(jsonql())

const server = app.listen(3000)

```

This is the bare minimum requirement to setup your jsonql server.
It expects your resolvers located in `<root>/resolvers`, your query should be in `<root>/resolvers/query` and mutation should be in `<root>/resolvers/mutation`.
and it will store the generated contracts in `<root>/contracts`

## Complete configuration options

| Name        | Description           | Default value  |
| ------------- |:-------------:| -----:|
| resolverDir | Where the resolvers are | `<root>/resolvers` |
| contractDir | Where to put the contract json files |  `<root>/contracts` |
