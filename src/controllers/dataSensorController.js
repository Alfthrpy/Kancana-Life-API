import dataSensorService from "../services/dataSensorService.js";
import sensorDataModel from "./../models/dataSensorModel.js";
import SSEInstance from "../utils/sseInstance.js";


const getSensorDataByDeviceAndFilter = async (req, res) => {
    try {
        const device_id = req.query.device_id;
        const filter = req.query.filter;
        let result;

        if (!filter) {
            result = await dataSensorService.getSensorDataByDevice(device_id);
        } else {
            result = await dataSensorService.getSensorDataByDeviceAndFilter(
                device_id,
                filter
            );
        }

        if (result.length) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "Data not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addNewDataSensors = async (req, res) => {
  const data = req.body
    try {
        const validatedData = await sensorDataModel.validatedData(data);
        const result = await dataSensorService.addNewDataSensors(validatedData);
        return res.status(201).json({message: 'Data added successfully'});
    } catch (error) {
        const errorMessages = error.message.split('; ');
        return res.status(400).json({ message: 'Invalid Input Data',details:errorMessages });
    }
};

const streamDataSensors = async (req,res)=>{
    const device_id = req.query.device_id;
    SSEInstance.initSSE()(req,res)
    await dataSensorService.streamDataSensors(device_id);
    
}

const controllers = { getSensorDataByDeviceAndFilter, addNewDataSensors, streamDataSensors };
export default controllers;
