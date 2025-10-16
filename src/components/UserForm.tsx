import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useUsersStore from "../store/usersStore";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(\d{10}|\(\d{3}\) \d{3}-\d{4})$/,
      "phone number must be eighter 10 digits or format (555) 123-4567"
    ),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  streetName: z.string().min(2, "Street Name must be at least 2 characters"),
  streetNumber: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
  isEdit?: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ isEdit = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();

  const addUser = useUsersStore((state) => state.addUser);
  const updateUser = useUsersStore((state) => state.updateUser);

  const onSubmit = (data: UserFormData) => {
    if (!isEdit) {
      const user = {
        id: crypto.randomUUID(),
        name: data.name,
        location: {
          city: data.city,
          state: data.state,
          street: {
            // number: data.streetNumber,
            // converting the number to the user number type
            ...(data.streetNumber && { number: parseInt(data.streetNumber, 10) }),
            name: data.streetName,
          },
        },
        email: data.email,
        phone: data.phone,
      };
      addUser(user);
      navigate("/");
    } else {
      updateUser(data.email);
    }
  };

  console.log("errors", errors);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">{isEdit ? "Edit User" : "Add New User"}</h3>
            </Card.Header>
            <Card.Body className="bg-body-secondary">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.name}
                        placeholder="Enter user name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <div className="error-text">{errors.name.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        isInvalid={!!errors.email}
                        placeholder="Enter email address"
                        {...register("email")}
                      />
                      {errors.email && (
                        <div className="error-text">{errors.email.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        isInvalid={!!errors.phone}
                        placeholder="Enter phone number"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <div className="error-text">{errors.phone.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.city}
                        placeholder="Enter city"
                        {...register("city")}
                      />
                      {errors.city && (
                        <div className="error-text">{errors.city.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.state}
                        placeholder="Enter state"
                        {...register("state")}
                      />
                      {errors.state && (
                        <div className="error-text">{errors.state.message}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Number</Form.Label>
                      <Form.Control
                        type="number"
                        isInvalid={!!errors.streetNumber}
                        placeholder="Enter street number"
                        {...register("streetNumber")}
                      />
                      {errors.streetNumber && (
                        <div className="error-text">
                          {errors.streetNumber.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street Name</Form.Label>
                      <Form.Control
                        type="text"
                        isInvalid={!!errors.streetName}
                        placeholder="Enter street name"
                        {...register("streetName")}
                      />
                      {errors.streetName && (
                        <div className="error-text">
                          {errors.streetName.message}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex gap-2 justify-content-end">
                  <Button variant="secondary" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {isEdit ? "Update User" : "Add User"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
