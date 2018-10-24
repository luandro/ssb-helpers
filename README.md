# SSB-HELPERS

Some helper functions for using [scuttlebot](https://github.com/ssbc/scuttlebot). All functions are async so use newer version of NodeJS.

## Usage

Simply install and import the functions:

`npm i -S ssb-helpers`

```js
const { whoami } from 'ssb-helpers'

const getMyId = async (sbot) => {
  try {
    const myId = await whoami(sbot)
    console.log(myId)
  } catch (err) throw err
}

```

For the API either check the `index.js` file or [ssb-graphql-defaults](https://github.com/luandro/ssb-graphql-defaults) which implements it over GraphQL.