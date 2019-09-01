// just being lazy ...
const { join } = require('path')
const glob = require('glob')
const fsx = require('fs-extra')

const baseDir = join(__dirname, 'docs')

glob(baseDir, function(err, files) {
  if (err) {
    console.error(`glob encounter an error`, err)
    return
  }
  // processing start - generate tree and filter out the files we don't want

})
