import supabase from "../config/database.js"


const getSuggestions = async (query) =>{
    try {
        const {data,error} = await supabase.
        from('devices')
        .select('name')
        .ilike('name',`%${query}%`)

        if(error){
            throw error
        }

        return data
    } catch (error) {   
        throw error 
    }
}

const searchDevice = async(query) =>{
    try {
        const {data,error} = await supabase
        .from('devices')
        .select('id, name')
        .eq('name',query)
        .limit(1)

        if(error) throw error

        return data
    } catch (error) {
        throw error
    }
}

const service = {getSuggestions,searchDevice}
 
export default service