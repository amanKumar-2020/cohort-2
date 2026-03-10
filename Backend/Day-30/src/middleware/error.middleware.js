async function handleError(err,req,res,next) {
    const response = {
        message: err.message
    }

    res.status(err.status).json(response)
}

export default handleError;