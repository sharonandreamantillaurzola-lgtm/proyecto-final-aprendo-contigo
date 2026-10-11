import { Router } from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from './controllers/products.controllers.js';
import {
    getPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
} from './controllers/promociones.controllers.js';
import {
    getRecognitions,
    createRecognition,
    updateRecognition,
    deleteRecognition,
} from './controllers/reconocimiento.controllers.js';

const router = Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/promotions', getPromotions);
router.post('/promotions', createPromotion);
router.put('/promotions/:id', updatePromotion);
router.delete('/promotions/:id', deletePromotion);

router.get('/recognitions', getRecognitions);
router.post('/recognitions', createRecognition);
router.put('/recognitions/:id', updateRecognition);
router.delete('/recognitions/:id', deleteRecognition);

export default router;

