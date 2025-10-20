import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useUsersStore from "../store/usersStore";
import { Slide, toast } from "react-toastify";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(\d{10}|\(\d{3}\) \d{3}-\d{4})$/,
      "Phone number must be either 10 digits or format (555) 123-4567"
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
  const navigate = useNavigate();
  const addUser = useUsersStore((state) => state.addUser);
  const { id } = useParams();
  const getUserByID = useUsersStore((state) => state.getUserByID);
  const existingUser = id ? getUserByID(id) : null;
  const updateUser = useUsersStore((state) => state.updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: existingUser
      ? {
          name: existingUser?.name,
          phone: existingUser?.phone,
          email: existingUser?.email,
          city: existingUser?.location.city,
          state: existingUser?.location.state,
          streetName: existingUser?.location.street.name,
          streetNumber: "" + existingUser?.location.street.number || "",
        }
      : undefined,
  });

  const onSubmit = (data: UserFormData) => {
    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      location: {
        city: data.city,
        state: data.state,
        street: {
          // number: data.streetNumber,
          // converting the number to the user number type
          ...(data.streetNumber && {
            number: parseInt(data.streetNumber, 10),
          }),
          name: data.streetName,
        },
      },
      email: data.email,
      phone: data.phone,
    };
    if (!isEdit) {
      addUser(user);
      navigate("/");
      toast.success(`User ${user.name} is added successfully.`, {
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
    } else {
      if (id) {
        updateUser(id, user);
        navigate("/", {
          state: {
            highlightedUserId: id
          }
        })
        toast.success(`User ${user.name} is updated successfully.`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      })
      }
    }
  };

  // console.log("errors", errors);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-10 px-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-800 rounded-2xl shadow-xl overflow-hidden text-white">
        <div className="bg-sky-600 text-white py-4 px-6">
          <h3 className="text-2xl font-semibold">
            {isEdit ? "Update User" : "Add New User"}
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-200 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter user name"
                {...register("name")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name ? "border-red-500 focus:ring-red-400" : " border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-yellow-200 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-400" : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow-200 mb-1">Phone</label>
              <input
                type="tel"
                placeholder="Enter phone number"
                {...register("phone")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone ? "border-red-500 focus:ring-red-400" : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-yellow-200 mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                {...register("city")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? "border-red-500 focus:ring-red-400" : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.city && (
                <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-yellow-200 mb-1">State</label>
              <input
                type="text"
                placeholder="Enter state"
                {...register("state")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.state ? "border-red-500 focus:ring-red-400" : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-yellow-200 mb-1">Street Number</label>
              <input
                type="number"
                placeholder="Enter street number"
                {...register("streetNumber")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.streetNumber
                    ? "border-red-500 focus:ring-red-400"
                    : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.streetNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.streetNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-yellow-200 mb-1">Street Name</label>
              <input
                type="text"
                placeholder="Enter street name"
                {...register("streetName")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.streetName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-sky-500 focus:ring-sky-400"
                }`}
              />
              {errors.streetName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.streetName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 font-bold">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-lg bg-gray-600  hover:bg-gray-700 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 transition-all cursor-pointer"
            >
              {isEdit ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
