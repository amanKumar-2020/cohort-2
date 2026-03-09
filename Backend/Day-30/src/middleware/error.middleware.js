async function handleError(err,req,res,next) {
    return res.status(500).json({
      message: "Error encounter while register",
    });
}

export default handleError;