const asyncHandler =(fn)=>async(re,res,next)=>{
    try {
        await fn(req,res,next)

        
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
}

const asyncHandlerPromiseVersion =(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            res.status(err.code || 500).json({
                success:false,
                message:err.message
            })  
        })
    }
}

export {asyncHandler,asyncHandlerPromiseVersion}