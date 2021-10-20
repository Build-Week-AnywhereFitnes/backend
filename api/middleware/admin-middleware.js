const adminCheck = (req, res, next) => {
  const { decodedToken } = req

  // console.log(`admin check`, req)
  console.log(`admin check`, decodedToken.role)

  if (decodedToken.role !== 1) {
    next({
      status: 403,
      message: 'Access restricted'
    })
  } else {
    console.log('vibe check passed')
    next()
  }
}

module.exports = adminCheck