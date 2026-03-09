

export async function registerController(req,res,next) {
    try {
        throw new Error("Error while register")
    } catch (error) {
        next(error)
    }
    
}
