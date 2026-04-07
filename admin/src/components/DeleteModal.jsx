const DeleteModal = ({ product, onConfirm, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-white mb-4">Delete {product.name}?</h2>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Delete
          </button>

          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
