
function asyncHandler(requestHandler){
  return (res, req, next) => {
    Promise.resolve(requestHandler(res, req, next)).catch((error) => next(error))
  }
}

export default asyncHandler

/*
const asyncHandler = (func) => async (res, req, next) => {
  try {
    await func(res, req, next)
  } catch (error) {
    res.status(err.code || 500 ).json({
      success: false,
      message: err.message
    })
  }
}
*/