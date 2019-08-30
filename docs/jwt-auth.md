# Auth - protect your call with JWT

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
Authorization will be a chapter on it's own.
