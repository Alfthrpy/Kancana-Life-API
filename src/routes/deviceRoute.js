import express from "express";
import DeviceController from '../controllers/deviceController.js'

const router = express.Router();

router.get('/devices',DeviceController.getDeviceById)
router.patch('/devices/:id',DeviceController.updateDevice)
router.delete('/devices/:id')
router.get('/devices/stream')

export default router