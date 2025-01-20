import verifyAuth from '../../middlewares/verifyAuth.js'
import bcrypt from 'bcrypt-nodejs'
import express from 'express'
import path from 'path'
import fs from 'fs';

export default function ({ db, config, ensurePfp }) {
  const router = express.Router()

  router.get('/', verifyAuth(), async (req, res) => {
    await ensurePfp(req.user._id)
    res.render('profile', { title: _CC.lang('PROFILE_TITLE', req.user._id) })
  })

  router.post('/pfp', verifyAuth(), async (req, res) => {
    if (config.pfp) {
      req.user.pfp = req.body.image
      await db.put(req.user)
      if (!req.user.pfp) await ensurePfp(req.user._id)
      req.flash('success', _CC.lang('PROFILE_SAVE_PFP_SUCCESS'))
    } else {
      req.flash('error', _CC.lang('PROFILE_SAVE_PFP_DISABLED'))
    }
    res.redirect('/profile')
  })

  const INFO_KEYS = [
    'shoeSize', 'ringSize', 'dressSize',
    'sweaterSize', 'shirtSize', 'pantsSize',
    'coatSize', 'hatSize', 'phoneModel'
  ]
  router.post('/info', verifyAuth(), async (req, res) => {
    if (!req.user.info) {
      req.user.info = {}
    }
    for (const [k, v] of Object.entries(req.body)) {
      console.log({ k, v })
      if (!INFO_KEYS.includes(k)) continue
      req.user.info[k] = v
    }
    await db.put(req.user)
    req.flash('success', _CC.lang('PROFILE_UPDATE_INFO_SUCCESS'))
    res.redirect('/profile')
  })

  router.get('/password', verifyAuth(), async (req, res) => {
    await ensurePfp(req.user._id)
    res.render('profile-password', { title: _CC.lang('PROFILE_PASSWORD_TITLE', req.user._id) })
  })

  router.post('/password', verifyAuth(), (req, res) => {
    if (!req.body.oldPassword) {
      req.flash('error', _CC.lang('PROFILE_PASSWORD_REQUIRED_OLD'))
      return res.redirect('/profile/password')
    }
    if (!req.body.newPassword) {
      req.flash('error', _CC.lang('PROFILE_PASSWORD_REQUIRED_NEW'))
      return res.redirect('/profile/password')
    }
    bcrypt.compare(req.body.oldPassword, req.user.password, (err, correct) => {
      if (err) throw err
      if (correct) {
        bcrypt.hash(req.body.newPassword, null, null, (err, hash) => {
          if (err) throw err
          db.get(req.user._id)
            .then(doc => {
              doc.password = hash
              db.put(doc)
                .then(() => {
                  req.flash('success', _CC.lang('PROFILE_PASSWORD_SUCCESS'))
                  res.redirect('/profile/password')
                })
                .catch(err => { throw err })
            })
            .catch(err => { throw err })
        })
      } else {
        req.flash('error', _CC.lang('PROFILE_PASSWORD_OLD_MISMATCH'))
        res.redirect('/profile/password')
      }
    })
  })

  router.post('/upload-pfp', verifyAuth(), async (req, res) => {

    // Check that a file was uploaded
    if (!req.files || !req.files.profilePicture) {
      req.flash('error', _CC.lang('PROFILE_PFP_UPLOAD_NO_FILE'));
      return res.redirect('/profile');
  }

    const profilePicture = req.files.profilePicture;
    const allowedExtensions = /png|jpg|jpeg/;
    const extName = path.extname(profilePicture.name).toLowerCase();
    const oldPfp = req.user.pfp;

    // Validate file type
    if (!allowedExtensions.test(path.extname(profilePicture.name).toLowerCase()) || !allowedExtensions.test(profilePicture.mimetype)) {
      req.flash('error', _CC.lang('PROFILE_PFP_UPLOAD_FILE_TYPE'));
      return res.redirect('/profile');
  }

    // Validate file size (e.g., 2 MB limit)
    const maxSize = _CC.config.pfpUploadMaxSize * 1024 * 1024; // 2 MB
    if (profilePicture.size > maxSize) {
      req.flash('error', _CC.lang('PROFILE_PFP_UPLOAD_FILE_SIZE'));
      return res.redirect('/profile');
    }

    // Generate unique filename and save file
    const fileName = `${Date.now()}${extName}`;
    const uploadPath = path.join(_CC.uploadDir, fileName);
    try {
        await profilePicture.mv(uploadPath);
        // Update the user object
        const filePath = `/uploads/profile_pictures/${fileName}`;
        req.user.pfp = filePath;
        await db.put(req.user);
        req.flash('success', _CC.lang('PROFILE_PFP_UPLOAD_SUCCESS'));
    }
    catch (err) {
        console.error(err);
        req.flash('error', _CC.lang('PROFILE_PFP_UPLOAD_ERROR'));
    }

    // Check if file exists before deleting
    const oldPfpPath = path.join(_CC.uploadDir, path.basename(oldPfp));
    fs.access(oldPfpPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File not found: ${oldPfpPath}`);
        }
        else {
            fs.unlink(oldPfpPath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                }
                else {
                    console.log(`File deleted: ${oldPfpPath}`);
                }
            });
        }
    });
    
    res.redirect('/profile')
  })

  return router
}
