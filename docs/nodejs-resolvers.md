# Resolvers

There are only four types of resolvers: `query`, `mutation`, `auth` and `socket`
(to enable socket require extra setups and install separate modules, socket will be in a separate chapter)

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
