export async function doDbMigrations () {
  await pfpStringToObject()
}

async function pfpStringToObject () {
  for (const { doc: user } of (await _CC.usersDb.allDocs({ include_docs: true })).rows) {
    if (typeof user.pfp === 'string') {
      user.pfp = { url: user.pfp }
      await _CC.usersDb.put(user)
      console.log(`Migrated user ${user._id} pfp string to object`)
    }
  }
}
