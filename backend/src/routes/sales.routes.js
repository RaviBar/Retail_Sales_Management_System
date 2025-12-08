import express from 'express';
import { getSalesData, getFilterOptionsData } from '../controllers/sales.controller.js';

const router = express.Router();

router.get('/', getSalesData);
router.get('/filter-options', getFilterOptionsData);

export default router;



