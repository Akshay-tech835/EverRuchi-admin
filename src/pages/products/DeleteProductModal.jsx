export default function DeleteProductModal({ product, onConfirm, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}   // ← CLOSE WHEN CLICK OUTSIDE
    >
      <div
        className="bg-white p-6 rounded-xl w-[350px] shadow-lg"
        onClick={(e) => e.stopPropagation()} // ← STOP closing when clicking inside
      >
        <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
        <p>
          Are you sure you want to delete <b>{product.name}</b>?
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={() => onConfirm(product.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
