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
import {
    createUser,
    login,
    getUser,
    getUsers,
    updateUserName,
    deleteUser,
    adminDeleteUser,
} from './controllers/user.controller.js';
import { requireAuth, requireSameUser, requireAdmin } from './middleware/auth.middleware.js';

const router = Router();

router.post('/users', createUser);
router.post('/auth/login', login);
router.get('/users', requireAuth, requireAdmin, getUsers);
router.get('/users/:id', requireAuth, requireSameUser, getUser);
router.put('/users/:id/name', requireAuth, requireSameUser, updateUserName);
router.delete('/users/:id', requireAuth, requireAdmin, adminDeleteUser);

router.get('/products', getProducts);
router.post('/products', requireAuth, requireAdmin, createProduct);
router.put('/products/:id', requireAuth, requireAdmin, updateProduct);
router.delete('/products/:id', requireAuth, requireAdmin, deleteProduct);

router.get('/promotions', getPromotions);
router.post('/promotions', requireAuth, requireAdmin, createPromotion);
router.put('/promotions/:id', requireAuth, requireAdmin, updatePromotion);
router.delete('/promotions/:id', requireAuth, requireAdmin, deletePromotion);

router.get('/recognitions', getRecognitions);
router.post('/recognitions', requireAuth, requireAdmin, createRecognition);
router.put('/recognitions/:id', requireAuth, requireAdmin, updateRecognition);
router.delete('/recognitions/:id', requireAuth, requireAdmin, deleteRecognition);

export default router;

