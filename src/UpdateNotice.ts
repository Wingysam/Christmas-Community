import config from './config/index.js'
import fetch from 'node-fetch'

class UpdateNotice {
  isOutdated = false
  current?: string
  latest?: string

  constructor () {
    if (!config.updateCheck) return
    void this.checkUpdates()
    setInterval(() => { void this.checkUpdates() }, 1000 * 60 * 60) // hour
  }

  async checkUpdates () {
    try {
      const res = await fetch('https://raw.githubusercontent.com/Wingysam/Christmas-Community/master/package.json')
      const data: typeof _CC.packageJson = await res.json()
      this.current = _CC.packageJson.version
      this.latest = data.version
      this.isOutdated = this.current !== this.latest
    } catch (_) {}
  }
}

export default new UpdateNotice()
