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

## Query

Think of it as GET in REST. The query function allow you to have as many parameters, or none.

Take a look at this example:

```js
// This is a built in query resolver - its for you to test if the server is running or not
// this is in the client
(function() {
  jsonqlClient()
    .then(client => {
      client.query.helloWorld()
        .then(msg => {
          console.log(msg)
        })
    })
})()
```
One of the most import thing when working with our jsonql system is - **YOU MUST WRITE CORRECT JSDOC** that's right :)

We have developed an internal engine to read your resolver then generate the contract; and it uses the jsdoc information to correctly
type your input parameters (not typing the return result at the moment but it will be in the later release),
also the validation uses the same information. If you think about it, as a good programmer, you should write correct
comment, and by doing that, our system eliminate two steps for you. So why not ;) also the same information feed into an extra tool
that help you to communicate between team, see **jsonql-web-console** in the later section.

```js
// this is the resolver code using cjs
/**
 * This is a query of mine
 * @param {string} arg something I want to say
 * @param {number} [num=1] just a number
 * @return {string} a string repeat number of times
 */
module.exports = function myQuery(arg, num = 1) {
  let result = new Array(num).fill(arg)
  return result.join(' ')
}
```

We will come back with more about different type of query in the later chapters.

## Mutation

Think of this as the POST / PUT. But its a little bit different, whenever you want to modify something then you should
use a mutation. Although we do not have any strict rules about it. But as a good practice, you should do it this way.

And mutation only has two parameters:

- payload - any type you want, and this will take in as the data you want to save
- condition - this is optional also any type you want.

The reason why we make the mutation function signature different is just for clarity sake.

```js
/**
 * A mutation resolver to save something
 * @param {*} payload can be anything
 * @param {number} id you can name it anything, because we just ignore anything afterward
 * @return {boolean} true on success
 */
module.exports = function saveSomething(payload, id) {
  // do your thing ...
  return true
}

```

If you notice, we also use named function style to write our resolver. And there is a reason for that.
We will explain more in later chapters.

## Auth - protect your call with JWT

We have a built-in jwt layer on both client and server side. All you have to do
is enable when you setup your middleware with `enableAuth:true`

```js
const app = new Koa()
const jsonqlMiddleware = jsonql({
  enableAuth: true
})
app.use(jsonqlMiddleware)
```

Then you can create several auth related methods inside the `<root>/resolvers/auth` folder

```js
// make sure the name is `login` but you can change it using the configuration option
/**
 * We expect you to return an user data object then we use it to create the JWT
 * @param {string} username user
 * @param {string} password pass
 * @return {object} userdata
 */
module.exports = function login(username, password) {
  // yes you can return promise
  return db.login(username, password)
            .then(userdata => {
              userdata.lastLogin = Date.now()
              return userdata;
            })
}

```

Of course, you can use other way to protect your resolver - BUT highly NOT recommended.
Of course, you can use other way to protect your resolver - BUT highly NOT recommended.
Authorisation will be a chapter on it's own.

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
