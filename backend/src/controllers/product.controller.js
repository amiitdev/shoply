import Product from '../models/product.model.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
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
  const { search = '', category, minPrice, maxPrice, page = 1 } = req.query;

  const query = {};
  // 🔍 Search (name)
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  // 📦 Category
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }
  // 💰 Price filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  // 📄 Pagination
  const limit = 8;
  const skip = (page - 1) * limit;
  const products = await Product.find(query).skip(skip).limit(limit);
  const total = await Product.countDocuments(query);
  res.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const getCategories = async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
};
