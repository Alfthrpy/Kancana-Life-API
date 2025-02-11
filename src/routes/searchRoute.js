import express from "express";
import SearchController from './../controllers/searchController.js'

const router = express.Router();

router.get('/suggestions',SearchController.getSuggestions)
router.get('/search',SearchController.searchDevice)

export default router