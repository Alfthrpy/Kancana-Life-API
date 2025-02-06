import supabase from "../config/database.js";

const getDeviceById = async (id) => {
    try {
        const data = await supabase
        .from('devices')
        .select('*')
        .eq('id',id)

        return data
    } catch (error) {
        throw error
    }

}

const getAllDevices = async () =>{
    try {
        const data = await supabase
        .from('devices')
        .select('*')

        return data
    } catch (error) {
        throw error
    }
}

const service = {getDeviceById, getAllDevices}

export default service