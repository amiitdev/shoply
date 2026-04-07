import { useState } from 'react';
import useProductStore from '../features/product/productStore';

const ProductForm = ({ existingProduct, onClose }) => {
  const { createProduct, updateProduct, loading } = useProductStore();

  const [form, setForm] = useState({
    name: existingProduct?.name || '',
    price: existingProduct?.price || '',
    description: existingProduct?.description || '',
    category: existingProduct?.category || '',
    stock: existingProduct?.stock || '',
    image: null,
  });

  const [preview, setPreview] = useState(existingProduct?.image || null);

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📤 image preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🚀 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingProduct) {
      await updateProduct(existingProduct._id, form);
    } else {
      await createProduct(form);
    }

    onClose && onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl space-y-4 border border-gray-800 relative"
    >
      {/* ✖️ CLOSE BUTTON - ADD THIS */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-xl font-bold text-white">
        {existingProduct ? 'Edit Product' : 'Create Product'}
      </h2>

      {/* 🧾 INPUTS */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="input w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="input w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="input w-full p-2 rounded bg-gray-800 text-white"
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="input w-full p-2 rounded bg-gray-800 text-white"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="input w-full p-2 rounded bg-gray-800 text-white"
      />

      {/* 📤 IMAGE */}
      <input type="file" onChange={handleImage} className="text-white" />

      {/* 🖼️ PREVIEW */}
      {preview && (
        <img
          src={preview}
          className="w-32 h-32 object-cover rounded"
          alt="Preview"
        />
      )}

      {/* 🚀 BUTTONS */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded text-white flex-1"
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>

        {/* Optional: Add Cancel Button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-700 px-4 py-2 rounded text-white hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
