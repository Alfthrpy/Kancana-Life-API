import DeviceService from '../services/deviceService.js'


const getDeviceById = async (req, res) => {
    try {
        const id = req.query.device_id
        let result;
        if(id){
            result = await DeviceService.getDeviceById(id)
        } else {
            result = await DeviceService.getAllDevices()
        }

        return (result.length ? res.status(200).json(result) : res.status(404).json({message : "Data not found"}))
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

const updateDevice = async (req,res) => {
    const id = req.params.id
    const newName = req.body.name
    try {
        const result = await DeviceService.updateDeviceName(id,newName)
        if(result.length){
            return res.status(200).json({message:"Data berhasil diedit"})
        } else {
            return res.status(404).json({message:"Id tidak ditemukan"})
        }
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error})
    }
}

const deleteDevice = async(req,res) => {
    const id = req.params.id
    try {
        const result = await DeviceService.deleteDevice(id)
        if(result.length){
            return res.status(200).json({message:"Data berhasil dihapus"})
        } else {
            return res.status(404).json({message:"Id tidak ditemukan"})
        }
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error})
    }
}

const getDevicesDashboard = async (req,res)=>{
    try {
        const result = await DeviceService.getDevicesDashboard()
        return res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Internal server error",error})
    }
    
}


const controllers = {getDeviceById,updateDevice,deleteDevice,getDevicesDashboard}

export default controllers