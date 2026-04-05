import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: String,
    stock: {
      type: Number,
      default: 0,
    },
    image: { type: String, required: true }, // Cloudinary URL
    imagePublicId: { type: String }, // Cloudinary public ID for deletion
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
