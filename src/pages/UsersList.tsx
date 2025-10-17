import {
  Edit2,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="text-primary mb-0">User Management</h2>
        <Button
          className="d-flex p-2 align-items-center gap-1"
          size="sm"
          onClick={() => navigate("/add")}
        >
          <Plus size={18} />
          <span className="d-none d-sm-inline">Add New User</span>
          <span className="d-sm-none">Add</span>
        </Button>
      </div>
      {users.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-body-secondary">No users found</h5>
          <p className="text-body-secondary">
            Click "Add New User" button to get started
          </p>
        </div>
      ) : (
        // <pre>{JSON.stringify(users,null,2)}</pre>
        <Row className="g-4 py-4">
          {users.map((user) => {
            return (
              <Col key={user.id} xs={12} sm={6} lg={4}>
                <Card
                  className={`shadow-hover bg-body-secondary ${
                    highlightedId === user.id ? "highlight-shadow" : ""
                  }`}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="text-primary mb-1 text-truncate">
                        {user.name}
                      </h6>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditClick(user)}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <MailIcon
                          size={16}
                          className="text-body-secondary flex-shrink-0"
                        />
                        <small className="text-break">{user.email}</small>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <PhoneIcon
                          size={16}
                          className="text-body-secondary flex-shrink-0"
                        />
                        <small className="text-break">{user.phone}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-2 mb-2">
                      <MapPinIcon
                        size={16}
                        className="text-body-secondary mt-1 flex-shrink-0"
                      />
                      <div className="flex-grow-1">
                        <div className="small">
                          {user.location.street.number}{" "}
                          {user.location.street.name}
                        </div>
                        <div className="text-body-secondary">
                          {user.location.city}, {user.location.state}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        userName={userToDelete?.name || ""}
        onConfirm={handleDeleteConfirm}
        onHide={handleDeleteCancel}
      />
    </Container>
  );
};

export default UsersList;
