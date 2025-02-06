import DeviceService from './../services/deviceService'


const getDeviceById = async (req, res) => {
    try {
        const id = req.query.device_id
        if(id){
            const result = await DeviceService.getDeviceById(id)
            return res.status(200).json(result)
        } else {
            const result = await DeviceService.getAllDevices()
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}



const controller = {getDeviceById}

export default controller