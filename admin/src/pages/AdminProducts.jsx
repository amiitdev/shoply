import { useEffect, useState } from 'react';
import useProductStore from '../features/product/productStore';
import ProductForm from '../components/ProductForm';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';

const AdminProducts = () => {
  const { products, fetchProducts, deleteProduct, loading } = useProductStore();

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 sm:p-6 text-white max-w-7xl mx-auto">
      {/* 🔥 HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">📦 Admin Products</h1>

        <button
          onClick={() => setShowForm(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Add Product
        </button>
      </div>

      {/* ➕ FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg">
            <ProductForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* 📦 LOADING */}
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <>
          {/* 📱 GRID */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(Array.isArray(products) ? products : []).map((p) => (
              <div
                key={p._id}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow hover:shadow-purple-500/10 transition"
              >
                {/* 🖼️ IMAGE */}
                <img
                  src={p.image}
                  className="w-full h-40 object-cover"
                  alt={p.name}
                />

                {/* 📄 CONTENT */}
                <div className="p-4 space-y-2">
                  <h2 className="font-semibold text-sm line-clamp-1">
                    {p.name}
                  </h2>

                  <p className="text-purple-400 font-bold">₹{p.price}</p>

                  {/* ⚡ ACTIONS */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setEditing(p)}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-xs py-1.5 rounded transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeleting(p)}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-xs py-1.5 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 📭 EMPTY */}
          {(!products || products.length === 0) && (
            <div className="text-center text-gray-500 mt-10">
              No products found
            </div>
          )}
        </>
      )}

      {/* ✏️ EDIT */}
      <EditModal product={editing} onClose={() => setEditing(null)} />

      {/* 🗑️ DELETE */}
      <DeleteModal
        product={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          deleteProduct(deleting._id);
          setDeleting(null);
        }}
      />
    </div>
  );
};

export default AdminProducts;
