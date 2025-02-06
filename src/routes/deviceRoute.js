import express from "express";
import DeviceController from './../controllers/deviceController'

const router = express.Router();

router.get('/devices',DeviceController.getDeviceById)
router.patch('/devices/:id')
router.delete('/devices/:id')
router.get('/devices/stream')