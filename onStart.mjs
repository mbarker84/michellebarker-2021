import { writeFile } from 'fs'

const versionObject = {
  css: '',
  js: '',
}

writeFile(
  'src/_data/version.json',
  JSON.stringify(versionObject),
  function (err) {
    if (err) return console.log(err)
    console.log(`${JSON.stringify(versionObject)} > src/_data/version.json`)
  }
)
