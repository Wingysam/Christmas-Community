const { parse: yesNo } = require('yes-no')

module.exports = {
  singleList: yesNo(process.env.SINGLE_LIST || false),
  public: yesNo(process.env.LISTS_PUBLIC || false),
  table: yesNo(process.env.TABLE || true),
  smile: yesNo(process.env.SMILE || true),
  grouping: yesNo(process.env.GROUPING || false),
  note: {
    markdown: yesNo(process.env.MARKDOWN || false)
  }
}
