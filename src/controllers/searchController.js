import SearchService from './../services/searchService.js'

const getSuggestions = async(req,res) =>{
    const query = req.query.q
    try {
        const result = await SearchService.getSuggestions(query)

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const searchDevice = async(req,res) =>{
    const query = req.query.q
    try {
        const result = await SearchService.searchDevice(query)
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const controller = {getSuggestions,searchDevice}

export default controller