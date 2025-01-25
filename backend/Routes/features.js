const express = require('express');
const router = express.Router();
const featureController = require('../Controllers/features'); // Adjust path as necessary

// Routes for managing features
router.post('/create', featureController.createFeature); // Create
router.get('/get-all', featureController.getAllFeatures); // Get all
router.get('/get/:id', featureController.getFeatureById); // Get one
router.put('/edit/:id', featureController.updateFeature); // Update
router.delete('/delete/:id', featureController.deleteFeature); // Delete

module.exports = router;