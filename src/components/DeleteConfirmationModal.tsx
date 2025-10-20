import React from "react";
import { CircleX } from "lucide-react";

type DeleteConfirmationModalProps = {
  show: boolean;
  userName: string;
  onHide: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  userName,
  onHide,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onHide}
    >
      <div
        className="bg-slate-800 text-white w-full max-w-lg rounded-lg shadow-2xl border border-slate-700 p-6 relative animate-[fadeIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-600 pb-3">
          <h2 className="text-xl font-semibold text-sky-400 cursor-default">
            Confirm Delete
          </h2>
          <button
            onClick={onHide}
            className="text-slate-400 mb-2 hover:text-red-200 transition cursor-pointer"
          >
            <CircleX size={28}/>
          </button>
        </div>

        {/* Body */}
        <div className="py-4 text-slate-100">
          <p className="mb-2">
            Are you sure you want to delete the user{" "}
            <strong className="text-yellow-400">{userName}</strong>?
          </p>
          <p className="text-red-400 font-bold text-sm flex items-center gap-1">
            ⚠️ This action cannot be undone!
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t font-bold border-slate-600 pt-4">
          <button
            onClick={onHide}
            className="px-4 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition cursor-pointer"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
