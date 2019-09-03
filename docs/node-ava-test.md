# Testing

We use [ava.js](https://github.com/avajs/ava) through out the node / browser of this project.

## Testing resolver

One of the reason the resolver are separate entities is because we want it to be able to test
outside of the Koa framework (or the actual deliver framework, we have an Express version coming soon)
and the resolver should able to work from one framework to another without modification (as long as it's under the same environment, in this case node.js)

@TODO: example to show how to use jsonql-resolver module to test resolver

---

Last update: 3 SEP 20019 Joel Chu
