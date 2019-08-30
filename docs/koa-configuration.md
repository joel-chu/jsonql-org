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

| Name        | Description           | Expected Type | Default value  |
| ----------- |:----------------------| :------------:| :--------------|
| resolverDir | Where the resolvers are | `String` |`<root>/resolvers` |
| contractDir | Where to put the contract json files | `String` | `<root>/contracts` |
| enableAuth  | Enable authorization or not | `Boolean` | `false` |
| keysDir     | `enableAuth:true` we will put the RSA keys here | `String` | `<root>/keys`|
|publicMethodDir | `enableAuth:true` all the resolvers found in this folder will be available without login | `String` | `public` |
|privateMethodDir| `enableAuth:true` all the resolvers found outside of the `publicMethodDir` and inside this folder will treat as protected | `String` | `private` |
| loginHandlerName | `enableAuth:true` the default login handler file name | `String` | `login` |
| logoutHandlerName | `enableAuth:true` the default logout handler file name | `String` | `logout` |
| validatorHandlerName | `enableAuth:true` this function is for checking the incoming header to see if the jwt token is correct | `String` | `validator` |
| enableWebConsole | When set true, you can open your browser with `yourdomain/jsonql` and a generated documentation of all the resolvers will be available, only use this during development | `Boolean` | `false` |
| jsType | By default, we expect you to write your resolver in common js style, but you can pass `es` to this property and then you can write your resolver using ES6 syntax. Please note we are using the `esm` module to import your code to our common js code based, also several extra files will get generated inside the resolvers folder | `String` | `cjs` |
| clientConfig | You can pass option to configure another jsonql API using this property. Please see the resolver chapter for more information | `Array<object>` | `[]` |

---

There are in fact more configuration variables, some are rather sensitive and require extended knowledge of this system. The other are current reserved for features that is currently undergo development. Please check back here for update to date reference.

<small>Last update 30 Aug 2019, Joel Chu</small>
