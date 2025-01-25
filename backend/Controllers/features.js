const Feature = require('../Models/features'); // Adjust the path based on your folder structure
const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for saving files (make sure the directory exists)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename format: timestamp + file extension
  }
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type, only images and videos are allowed'), false);
  }
};

// Set up multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // File size limit (50MB)
}).array('files', 10); // Allow multiple files (e.g., up to 10 files)

// Create a new feature
exports.createFeature = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, notes, category } = req.body;
      const files = req.files.map(file => file.path); // Get the paths of the uploaded files

      const feature = new Feature({
        title,
        notes,
        category,
        files, // Store the file paths
      });

      const savedFeature = await feature.save();
      res.status(201).json({ message: 'Feature created successfully', feature: savedFeature });
    } catch (error) {
      res.status(500).json({ message: 'Error creating feature', error: error.message });
    }
  });
};

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching features', error: error.message });
  }
};

// Get a single feature by ID
exports.getFeatureById = async (req, res) => {
  const { id } = req.params;
  try {
    const feature = await Feature.findById(id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feature', error: error.message });
  }
};

// Update a feature
exports.updateFeature = async (req, res) => {
  const { id } = req.params;
  const { title, notes, category, files } = req.body;

  try {
    const feature = await Feature.findByIdAndUpdate(
      id,
      { title, notes, category, files },
      { new: true } // Return the updated document
    );
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json({ message: 'Feature updated successfully', feature });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feature', error: error.message });
  }
};

// Delete a feature
exports.deleteFeature = async (req, res) => {
  const { id } = req.params;

  try {
    const feature = await Feature.findByIdAndDelete(id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feature', error: error.message });
  }
};
