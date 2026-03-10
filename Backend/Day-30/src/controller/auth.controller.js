

export async function registerController(req,res,next) {
    try {
        throw new Error("Error while register")
    } catch (error) {
        error.status = (400)
        next(error)
    }
    
}
