import config from '../config/index.js'

export default function (req, res, next) {
  res.locals.config = config
  res.locals.req = req
  res.locals.lang = _CC.lang
  next()
}
