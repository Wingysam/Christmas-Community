const verifyAuth = require('../../middlewares/verifyAuth')
const express = require('express')
const { nanoid } = require('nanoid')
const { concat } = require('../../config/secret')
const { use } = require('passport')

const SECRET_TOKEN_LENGTH = 32
const SECRET_TOKEN_LIFETIME =
  // One week, approximately. Doesn't need to be perfect.
  1000 * // milliseconds
  60 * // seconds
  60 * // minutes
  24 * // hours
  7 // days



async function getAllDocumentIds() {
  try {
    const result = await _CC.usersDb.allDocs({ include_docs: false })
    const allIds = result.rows.map(row => row.id)
    console.log('All Document IDs:', allIds)
    return allIds
  } catch (err) {
    console.error('Error fetching document IDs:', err)
  }
} 

function addAdditional(array, value){
  if (!array.includes(value)){
    array.push(value)
    return array
  }
  return array
}

function addAdditionalMulti(array1, array2){
  return Array.from(new Set([...array1, ...array2]))
}

function removeFromArray(array, value){
  index =  array.indexOf(value)
  array = array.splice( index, index)
  return array
}

async function marryUserToGroup (db, dbG, userId, groupId){
  console.log("marrying:" + userId + " and: " + groupId)
  // highest priority: put group name into user record.
  user = await db.get(userId)
  var group = await dbG.get(groupId)
  console.log("retreived user", user, "and group",group," data scuccesfully")
  //enable grouping for this user
  user.grouped = true
  user.groups = addAdditional(user.groups, groupId)
  group.users = addAdditional(group.users, userId)
  // add the users he now is in a group with to user
  console.log("this is user:",user)
  user.groupedWith =  addAdditionalMulti(user.groupedWith,group.users)
  // make shure all the other users know they aree in a group with him as well
  await db.put(user) 
  for (userId of user.groupedWith) {
    console.log("got this uid",userId)
    var otherUser = await db.get(userId)
    otherUser.groupedWith = addAdditional(user.groupedWith,user._id )
    await db.put(otherUser)
  }
  console.log("writing changes to db")
  await dbG.put(group)
  console.log("successfully married:" + userId + "obj", user, " and: " + groupId + "obj", group)
}

async function divorceUserFromGroup (db, dbG, userId, groupId){
  console.log("divcorcing:" + userId + " and: " + groupId)
  // highest priority: remove group name from users group record.
  user = await db.get(userId)
  group = await dbG.get(groupId)
  console.log("retreived user:", user," and group:", group, " data scuccesfully")
  user.groups = removeFromArray(user.groups, groupname)
  groupedWith = []
  // completly recreate groupedWith fot the user
  for (groupId of user.groups){
    const otherGroup = await dbG.get(groupId) 
    groupedWith = addAdditionalMulti(groupedWith, otherGroup.users) 
  }
  exPartners = user.groupedWith
  user.groupedWith = groupedWith
  // check out which users he doenst share a group with anymore
  divorcedFrom = exPartners.filter( function( el ) {
    return user.groupedWith.indexOf( el ) < 0
  })
  console.log("user should be divorced from" , divorcedFrom)
  
  if (user.groupedWith.length === 0){
    console.log("user is not in any group anymore remving him from group functionality  ")
    user.grouped = false
  }
  await db.put(user)
  // make shure all the other users which who he doesnt share a group anymore know as well  
  for (userId of divorcedFrom) {
    const otherUser = await db.get(userId)
    otherUser.groupedWith = removeFromArray(otherUser.groupedWith, userId)
    await db.put(otherUser)
  }
  group.users = removeFromArray(group.users, userId)
  await dbG.put(group)
  console.log("successfully divorced:" + userId + "obj", user, " and: " + groupId + "obj", group)
}

async function registry_office(func,  userId, groupIdArray){
  for (groupId of groupIdArray){
    await func(_CC.usersDb, _CC.groupsDb, userId, groupId)
  }
}

module.exports = ({ db, ensurePfp }) => {
  const router = express.Router()

  router.get('/', verifyAuth(), (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    if (_CC.config.wishlist.grouping) {
      db.allDocs({ include_docs: true })
        .then(users => {
          console.log("pulled users from db")
          userDocs = users
    
          _CC.groupsDb.allDocs({ include_docs: true })
            .then(groups => {
              console.log("pulled groups from db")
              res.render('adminSettings', { title: _CC.lang('ADMIN_SETTINGS_HEADER'), groups: groups.rows, users: userDocs.rows })
            })
            .catch(groupsErr => {
              console.error("Error pulling groups from db:", groupsErr)
              // Handle error for groups
              res.status(500).send("Internal Server Error")
            })
        })
        .catch(usersErr => {
          console.error("Error pulling users from db:", usersErr)
          // Handle error for users
          res.status(500).send("Internal Server Error")
        })
    }
    
    else{
      db.allDocs({ include_docs: true })
        .then(docs => {
          res.render('adminSettings', { title: _CC.lang('ADMIN_SETTINGS_HEADER'), users: docs.rows })
        })
        .catch(err => { throw err })
    }
  })


  if (_CC.config.wishlist.grouping){
    router.post('/add', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      const username = req.body.newUserUsername.trim()
      if (!username) {
        return db
          .allDocs({ include_docs: true })
          .then((docs) => {
            res.render('adminSettings', {
              add_user_error: _CC.lang(
                'ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY'
              ),
              title: _CC.lang('ADMIN_SETTINGS_HEADER'),
              users: docs.rows,
              groups: _CC.groupsDb.allDocs({ include_docs: true })
            })
          })
          .catch((err) => {
            throw err
          })
      }
      // some hint at data structure
      await db.put({
        _id: username,
        admin: false,
        wishlist: [],
        groupedWith: [],
        grouped: false,
        groups: [],
        signupToken: nanoid(SECRET_TOKEN_LENGTH),
        expiry: new Date().getTime() + SECRET_TOKEN_LIFETIME
      })
      await ensurePfp(username)
      res.redirect(`/admin-settings/edit/${req.body.newUserUsername.trim()}`)
    })
    router.post('/add-group', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      const groupname = req.body.newGroupGroupname.trim()
      if (!groupname) {
        return db
          .allDocs({ include_docs: true })
          .then((docs) => {
            res.render('adminSettings', {
              add_user_error: _CC.lang(
                'ADMIN_SETTINGS_GROUPS_ADD_ERROR_GROUPNAME_EMPTY'
              ),
              title: _CC.lang('ADMIN_SETTINGS_HEADER'),
              users: docs.rows,
              groups: _CC.groupsDb.allDocs({ include_docs: true })
            })
          })
          .catch((err) => {
            throw err
          })
      }
      // some hint at data structure
      await _CC.groupsDb.put({
        _id: groupname,
        users: []
      })
      // consider adding Profile Pictures for groups in the future
      // await ensurePfp(groupname)
      res.redirect(`/admin-settings/edit-group/${req.body.newGroupGroupname.trim()}`)
    })
    router.get('/edit-group/:groupToEdit', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      const doc = await  _CC.groupsDb.get(req.params.groupToEdit)
      res.render('admin-group-edit', { group: doc })
    })
    router.post('/edit-group/remove/:groupToRemove', verifyAuth(), async (req, res) => {
      try {
        if (!req.user.admin) return res.redirect('/')
        console.log("beta")
        const groupToRemove = await _CC.groupsDb.get(req.params.groupToRemove)
        console.log("hi")
        for (var user of groupToRemove.users){
          console.log("divorcing ", user, "and ", groupToRemove._id)
          await divorceUserFromGroup(_CC.usersDb, _CC.groupsDb, user, groupToRemove._id)
        }
        console.log("removing record")
        await _CC.groupsDb.remove(groupToRemove)
        req.flash('success', _CC.lang('ADMIN_SETTINGS_GROUPS_EDIT_DELETE_SUCCESS', req.params.groupToRemove))
      } catch (error) {
        req.flash('error', `${error}`)
      }
  
      res.redirect('/admin-settings')
    })
    router.post('/edit-group/marry-user-and-group/:groupToMarry', verifyAuth(), async (req, res) => {
      const username = req.body.marryingUserUsername.trim()
      var groupname  = req.params.groupToMarry
      try {
        console.log("marry user:" + username + " to group:" + req.params.groupToMarry )
        if (!req.user.admin) return res.redirect('/')
        
        userIndex = await getAllDocumentIds()
        console.log("successfully pulled index db: ")
        console.log(userIndex)
        if (userIndex.includes(username)){
          console.log(username+ "exists and marriage is possible")
          await marryUserToGroup(_CC.usersDb, _CC.groupsDb,username , groupname)
          req.flash('success', _CC.lang('ADMIN_SETTINGS_GOUPS_MARRIAGE_SUCCESS', req.params.groupToRemove))
        }
        else{
          console.log(req.params.groupToMarry+ "does not exist can't marry")
        }
      } catch (error) {
        req.flash('error', `${error}`)
      }
  
      res.redirect('/admin-settings/edit-group/' + req.params.groupToMarry)
    })
    router.get('/edit-group/divorce-user-and-group/:groupToDivorce/:userToDivorce', verifyAuth(), async (req, res) => {
      const username = req.params.userToDivorce
      var groupname  = req.params.groupToDivorce
      try {
        console.log("divorce user:" + username + " from group:" + groupname)
        if (!req.user.admin) return res.redirect('/')
        userIndex = await getAllDocumentIds()
        console.log("successfully pulled index db: ")
        console.log(userIndex)
        if (userIndex.includes(username)){
          console.log(username+ "exists and divorce is possible")
          await divorceUserFromGroup(_CC.usersDb, _CC.groupsDb,username , groupname)
          req.flash('success', _CC.lang('ADMIN_SETTINGS_GOUPS_DIVORCE_SUCCESS', groupname))
        }
        else{
          console.log(username+ "does not exist can't divorce")
        }
      } catch (error) {
        req.flash('error', `${error}`)
      }
  
      res.redirect('/admin-settings/edit-group/' + groupname)
    })
    router.get('/migrate-to-groups', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      res.render('admin-migrate-to-groups')
    })
    router.post('/migrate-to-groups', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      
      const dbInfo = await _CC.groupsDb.info()
      console.log("migration initiated")
      if (dbInfo.doc_count === 0) {
        console.log("no groups so far thus allowing for reset of groups and migartion")
        const usersBulk = []
        const { rows: users } = await db.allDocs({ include_docs: true })
        for (const { doc: user } of users) {
          user.groupedWith= [],
          user.grouped= false,
          user.groups= [],
          usersBulk.push(user)
        }
        await db.bulkDocs(usersBulk)
    
        await _CC.wishlistManager.clearCache()
    
        req.flash('success', _CC.lang('ADMIN_SETTINGS_GOUPS_MIGRATE_TO_SUCCESS'))
      }
      res.redirect('/admin-settings')
    })
  }
  else{
    router.post('/add', verifyAuth(), async (req, res) => {
      if (!req.user.admin) return res.redirect('/')
      const username = req.body.newUserUsername.trim()
      if (!username) {
        return db
          .allDocs({ include_docs: true })
          .then((docs) => {
            res.render('adminSettings', {
              add_user_error: _CC.lang(
                'ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY'
              ),
              title: _CC.lang('ADMIN_SETTINGS_HEADER'),
              users: docs.rows
            })
          })
          .catch((err) => {
            throw err
          })
      }
      // some hint at data structure
      await db.put({
        _id: username,
        admin: false,
        wishlist: [],
  
        signupToken: nanoid(SECRET_TOKEN_LENGTH),
        expiry: new Date().getTime() + SECRET_TOKEN_LIFETIME
      })
      await ensurePfp(username)
      res.redirect(`/admin-settings/edit/${req.body.newUserUsername.trim()}`)
    })
  }

  router.get('/edit/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.password
    res.render('admin-user-edit', { user: doc })
  })

  router.post('/edit/refresh-signup-token/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.signupToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.expiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/resetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.pwToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.pwExpiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/cancelresetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.pwToken
    delete doc.pwExpiry
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/rename/:userToRename', verifyAuth(), async (req, res) => {
    if (!req.user.admin && req.user._id !== req.params.userToRename) return res.redirect('/')
    if (!req.body.newUsername) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }
    if (req.body.newUsername === req.params.userToRename) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_SAME_NAME'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }

    const oldName = req.params.userToRename
    const newName = req.body.newUsername

    const userDoc = await db.get(oldName)
    if (_CC.config.wishlist.grouping){
      await registry_office(divorceUserFromGroup, userDoc._id, userDoc.groups )
    }
    userDoc._id = newName
    delete userDoc._rev
    try {
      await db.put(userDoc)
      try {
        const usersBulk = []
        const users = (await db.allDocs({ include_docs: true })).rows
        for (const { doc: user } of users) {
          for (const item of user.wishlist) {
            if (item.pledgedBy === oldName) item.pledgedBy = newName
            if (item.addedBy === oldName) item.addedBy = newName
          }
          usersBulk.push(user)
        }

        await db.bulkDocs(usersBulk)
        await db.remove(await db.get(oldName))

        await _CC.wishlistManager.clearCache()
        if (_CC.config.wishlist.grouping){
          await registry_office(marryUserToGroup, userDoc._id, userDoc.groups )
        }
        req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER'))
        return res.redirect(`/wishlist/${newName}`)
      } catch (error) {
        console.log(error, error.stack)
        await db.remove(await db.get(newName))
        throw error
      }
    } catch (error) {
      req.flash('error', error.message)
      return res.redirect(`/admin-settings/edit/${oldName}`)
    }
  })

  router.post('/edit/impersonate/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    req.login({ _id: req.params.userToEdit }, err => {
      if (err) {
        req.flash('error', err.message)
        return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
      }
      req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS', req.params.userToEdit))
      res.redirect('/')
    })
  })

  router.post('/edit/promote/:userToPromote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const user = await db.get(req.params.userToPromote)
    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }
    if (user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }

    user.admin = true
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
  })

  router.post('/edit/demote/:userToDemote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    if (req.user._id === req.params.userToDemote) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    const user = await db.get(req.params.userToDemote)

    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }
    if (!user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    user.admin = false
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
  })

  router.post('/edit/remove/:userToRemove', verifyAuth(), async (req, res) => {
    try {
      if (!req.user.admin) return res.redirect('/')


      const userToRemove = await db.get(req.params.userToRemove)
      console.log("initiated removal of user", userToRemove)
      if (userToRemove.admin) {
        req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN'))
        return res.redirect('/admin-settings')
      }
      
      console.log("removing user from all groups")
      if (_CC.config.wishlist.grouping){
        await registry_office(divorceUserFromGroup, userToRemove._id, userToRemove.groups )
      }
      await db.remove(userToRemove)
      const { rows } = await db.allDocs()
      for (const row of rows) {
        const wishlist = await _CC.wishlistManager.get(row.id)
        for (const item of wishlist.items) {
          if (item.addedBy === userToRemove._id) {
            await wishlist.remove(item.id)
          } else if (item.pledgedBy === userToRemove._id) {
            await wishlist.unpledge(item.id)
          }
        }
      }

      req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS', req.params.userToRemove))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect('/admin-settings')
  })

  router.get('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    res.render('admin-clear-wishlists')
  })

  router.post('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const usersBulk = []
    const { rows: users } = await db.allDocs({ include_docs: true })
    for (const { doc: user } of users) {
      user.wishlist = []
      usersBulk.push(user)
    }
    await db.bulkDocs(usersBulk)

    await _CC.wishlistManager.clearCache()

    req.flash('success', _CC.lang('ADMIN_SETTINGS_CLEARDB_SUCCESS'))
    res.redirect('/admin-settings')
  })

  return router
}
