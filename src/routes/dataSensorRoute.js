import express from "express";
import dataSensorController from "../controllers/dataSensorController.js";

const router = express.Router();

router.get('/data-sensors/by-device',dataSensorController.getSensorDataByDeviceAndFilter);
router.post('/data-sensors', dataSensorController.addNewDataSensors)
router.get('/data-sensors/stream', dataSensorController.streamDataSensors)

export default router;