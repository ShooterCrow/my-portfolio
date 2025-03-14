const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Service = require('../model/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ title: 1 });
  
  if (!services?.length)return res.status(404).json({ message: "404 Not Found" });
  return res.status(200).json(services);
});

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate id format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid service ID' });
  }
  
  const service = await Service.findById(id);
  
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  
  res.json(service);
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin only)
const createService = asyncHandler(async (req, res) => {
  const { title, shortDescription, description, image, keyFeatures, pricing, relatedServices } = req.body;
  
  // Validate required fields
  if (!title || !shortDescription || !description || !image) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }
  
  // Validate relatedServices if provided
  if (relatedServices?.length) {
    for (const serviceId of relatedServices) {
      if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return res.status(400).json({ message: `Invalid related service ID: ${serviceId}` });
      }
    }
  }
  
  // Create new service
  const service = await Service.create({
    title,
    shortDescription,
    description,
    image,
    keyFeatures: keyFeatures || [],
    pricing: pricing || '',
    relatedServices: relatedServices || []
  });
  
  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400).json({ message: 'Invalid service data received' });
  }
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin only)
const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, shortDescription, description, image, keyFeatures, pricing, relatedServices } = req.body;
  
  // Validate id format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid service ID' });
  }
  
  // Validate required fields
  if (!title || !shortDescription || !description || !image) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }
  
  // Find service
  const service = await Service.findById(id);
  
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  
  // Update service
  service.title = title;
  service.shortDescription = shortDescription;
  service.description = description;
  service.image = image;
  service.keyFeatures = keyFeatures || [];
  service.pricing = pricing || '';
  service.relatedServices = relatedServices || [];
  
  const updatedService = await service.save();
  
  res.json(updatedService);
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin only)
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Validate id format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid service ID' });
  }
  
  // Find and delete service
  const service = await Service.findByIdAndDelete(id);
  
  if (!service) {
    return res.status(404).json({ message: 'Service not found' });
  }
  
  // Remove this service from relatedServices arrays in other services
  await Service.updateMany(
    { relatedServices: id },
    { $pull: { relatedServices: id } }
  );
  
  res.json({ message: `Service '${service.title}' deleted` });
});

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};