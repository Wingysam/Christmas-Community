const { exec } = require('child-process-promise')
const { spawn } = require('child_process')

const PACKAGENAME = 'get-product-name'

async function isOutdated() {
  const command = `npm outdated ${PACKAGENAME} --json`
  const npm = await exec(command)
  const data = JSON.parse(npm.stdout)
  return data[PACKAGENAME]?.current !== data[PACKAGENAME]?.wanted
}

async function updateGPD() {
  const command = `npm update ${PACKAGENAME}`
  await exec(command)
}

;(async () => {
  let cc = null
  function spawnCC() {
    cc = spawn('node', [ 'index.js' ], { env: process.env })
    cc.on('exit', spawnCC)
    cc.stdout.pipe(process.stdout)
    cc.stderr.pipe(process.stderr)
  }

  if (process.env.UPDATE_GPD !== 'false') {
    async function update() {
      if (await isOutdated()) {
        await updateGPD()
        if (cc) cc.kill('sigint')
        cc.once('exit', () => console.log(`Updated ${PACKAGENAME}`))
      }
    }
    update()
    setInterval(update, 1000 * 60 * 60) // 1 hour
  }
  
  spawnCC()
})()
