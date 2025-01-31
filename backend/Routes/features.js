const express = require('express');
const router = express.Router();
const featureController = require('../Controllers/features'); // Adjust path as necessary

// Routes for managing features (similar to the third file)
router.post('/create', featureController.createFeature); // Create feature with file upload
router.get('/get-all', featureController.getAllFeatures); // Get all features
router.get('/get/:id', featureController.getFeatureById); // Get a single feature
router.put('/edit/:id', featureController.updateFeature); // Update feature
router.delete('/delete/:id', featureController.deleteFeature); // Delete feature

module.exports = router;
