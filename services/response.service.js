/*
 Definition
*/
  const sendApiSuccessResponse = (req, res, data, message, err = null) => {
    const apiResponse = {
        endpoint: req.originalUrl,
        method: req.method,
        message: message,
        err: err,
        data: data,
        status: 200
    }

    return res.status(200).json(apiResponse);
  }

  const sendApiErrorResponse = (req, res, err, message) => {
    const apiResponse = {
        endpoint: req.originalUrl,
        method: req.method,
        message: message,
        err: err,
        data: null,
        status: 500
    }

    return res.status(500).json(apiResponse);
  }
// 


/*
  Export fonctions
*/
  module.exports = {
    sendApiSuccessResponse,
    sendApiErrorResponse
  };
//