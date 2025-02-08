import express from "express";
import DeviceController from '../controllers/deviceController.js'

const router = express.Router();

router.get('/devices',DeviceController.getDeviceById)
router.patch('/devices/:id',DeviceController.updateDevice)
router.delete('/devices/:id',DeviceController.deleteDevice)
router.get('/devices/dashboard',DeviceController.getDevicesDashboard)

export default router