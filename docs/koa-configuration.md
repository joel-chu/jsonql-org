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
