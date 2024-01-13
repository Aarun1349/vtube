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
    return(req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            console.log('err',err)
            res.status(err.code || 500).json({
                success:false,
                message:err.message
            })  
        })
    }
    
}

export {asyncHandler,asyncHandlerPromiseVersion}