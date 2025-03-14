const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const verifyJWT = require('../middleware/verifyJWT');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Protected admin-only routes
router.post('/', serviceController.createService);
router.put('/:id', verifyJWT, serviceController.updateService);
router.delete('/:id', verifyJWT, serviceController.deleteService);

module.exports = router;