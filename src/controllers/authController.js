import authService from './../services/authService.js'


const loginAdmin = async (req,res) =>{
    const body = req.body
    console.log(body)
    try {
        const result = await authService.loginAdmin(body)
        return res.status(200).json({accessToken : result.session.access_token})
    } catch (error) {
        return res.status(401).json(error.message)
    }
}

const loginUser = async (req,res)=> {
    const body = req.body
    try {
        const result = await authService.loginUser(body)
        if(result.success){
            return res.status(200).json({message:result.message,token:result.token})
        } else {
            return res.status(401).json({message:result.message})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

const controller = {loginAdmin,loginUser}

export default controller

