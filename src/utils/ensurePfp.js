import fs from 'fs/promises'

/**
 * Ensures a user has a profile picture. If not, assigns a random default.
 * @param {object} db - The user database (PouchDB instance)
 * @param {object} config - The app config
 * @param {string} username - The username to ensure pfp for
 * @returns {Promise<void>}
 */
export default async function ensurePfp(db, config, username) {
  if (!config.pfp) return
  const user = await db.get(username)
  if (user.pfp) return

  const { rows } = await db.allDocs({ include_docs: true })
  const unfilteredPool = await fs.readdir('src/static/img/default-pfps')
  const filteredPool = unfilteredPool.filter(
    (file) => !rows.find((row) => row.doc.pfp?.default === file),
  )
  const pool = filteredPool.length ? filteredPool : unfilteredPool

  user.pfp = { default: _CC._.sample(pool) }
  await db.put(user)
}
