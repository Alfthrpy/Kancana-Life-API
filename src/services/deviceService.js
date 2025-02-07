import supabase from "../config/database.js";

const getDeviceById = async (id) => {
    try {
        const {data,error} = await supabase
        .from('devices')
        .select('*')
        .eq('id',id)

        if (error) {
            throw error;
          }
        
        return data
    } catch (error) {
        throw error
    }

}

const getAllDevices = async () =>{
    try {
        const {data,error} = await supabase
        .from('devices')
        .select('*')

        if (error) {
            throw error;
          }

        return data
    } catch (error) {
        throw error
    }
}

const updateDeviceName = async (id, newName) => {
    console.log(id,newName)
    try {
        const {data,error} = await supabase
        .from('devices')
        .update({ name: newName })
        .eq('id',id)
        .select()

        console.log(data)
        return (data)

    } catch (error) {
        throw error
    }


}

const service = {getDeviceById, getAllDevices, updateDeviceName}

export default service