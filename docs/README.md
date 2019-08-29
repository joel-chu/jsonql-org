# jsonql introduction

> This is a huge collection of modules that help you to create API quickly.

This is **not** a replacement of REST or GraphQL, instead we are focus on the **_last one mile_**.

The communication protocol is based on [JSON API](https://jsonapi.org/).

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
