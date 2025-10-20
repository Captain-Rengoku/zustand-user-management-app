import {
  Edit2,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Plus,
  Trash2,
} from "lucide-react";
import useUsersStore from "../store/usersStore";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { Slide, toast } from "react-toastify";

const UsersList = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const users = useUsersStore((state) => state.users);
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log("state", state);
  const [highlightedId, setHighlightedId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    let timeout = 0;
    if (state?.highlightedUserId) {
      setHighlightedId(state.highlightedUserId);
      timeout = setTimeout(() => {
        setHighlightedId(undefined);
        // Use navigate to clear the state and delay navigation until after render
        navigate(".", { replace: true });
      }, 2500);
    }
    return () => clearTimeout(timeout);
  }, [state, navigate]);

  const deleteUser = useUsersStore((state) => state.deleteUser);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  const handleDeleteCancel = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
      setShowDeleteModal(false);
      toast.success("User is deleted successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };
  const handleEditClick = (user: User) => {
    navigate(`/edit/${user.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-10 px-4">
      <section className="min-h-[94svh] bg-slate-900 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <h2 className="text-sky-400 text-2xl bg-slate-800 py-2 px-4 rounded-lg font-bold shadow-yellow-400 shadow">User Management App</h2>
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 font-bold cursor-pointer px-4 py-2 rounded-lg shadow-md transition"
          >
            <Plus size={18} />
            <span className="font-medium hidden sm:inline">Add New User</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Empty State */}
        {users.length === 0 ? (
          <div className="min-h-[80svh] flex flex-col justify-center items-center py-10 text-slate-400">
            <h5 className="text-lg mb-2">No users found</h5>
            <p>
              Click{" "}
              <span className="text-sky-400 font-semibold">
                “Add New User”
              </span>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`bg-slate-700/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-all border border-slate-600 ${
                  highlightedId === user.id ? "ring-2 ring-sky-400" : ""
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-yellow-400 font-semibold truncate">
                    {user.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="p-2 rounded-lg border-3 border-slate-500 cursor-pointer text-slate-400 hover:bg-sky-500/40 hover:text-sky-400 transition"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="p-2 rounded-lg border-3 border-slate-500 cursor-pointer text-slate-400 hover:bg-red-500/40 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-sm text-slate-300 space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <MailIcon size={16} className="text-sky-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon size={16} className="text-sky-400" />
                    <span>{user.phone}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-slate-400 text-sm">
                  <MapPinIcon size={16} className="text-sky-400 mt-0.5" />
                  <div>
                    <p>
                      {user.location.street.number} {user.location.street.name}
                    </p>
                    <p className="text-slate-500">
                      {user.location.city}, {user.location.state}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          show={showDeleteModal}
          userName={userToDelete?.name || ""}
          onConfirm={handleDeleteConfirm}
          onHide={handleDeleteCancel}
        />
      </section>
    </div>
  );
};

export default UsersList;
