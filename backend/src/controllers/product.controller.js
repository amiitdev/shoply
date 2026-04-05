import Product from '../models/product.model.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  // console.log('BODY:', req.body);
  // console.log('FILE:', req.file);

  if (!name || !price)
    return res.status(400).json({ message: 'Name & price required' });
  if (!req.file) {
    return res.status(400).json({ message: 'Image required' });
  }
  const product = await Product.create({
    ...req.body,
    image: req.file.path,
    imagePublicId: req.file.filename,
    createdBy: req.user._id,
  });

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: 'Invalid ID' });

  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ message: 'Not found' });

  if (req.file) {
    if (product.imagePublicId)
      await cloudinary.uploader.destroy(product.imagePublicId);

    product.image = req.file.path;
    product.imagePublicId = req.file.filename;
  }

  Object.assign(product, req.body);

  await product.save();

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product?.imagePublicId)
    await cloudinary.uploader.destroy(product.imagePublicId);

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: 'Deleted' });
};

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};
