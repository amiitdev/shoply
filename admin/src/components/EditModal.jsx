import ProductForm from './ProductForm';

const EditModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[500px]">
        <ProductForm existingProduct={product} onClose={onClose} />
      </div>
    </div>
  );
};

export default EditModal;
