import React, { useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import Table from "../../components/ui/Table";
import axios from "axios";
import { BASE_URL, USERS } from "../../config";
import useSWR, { mutate } from "swr";
import Skeleton from "../../components/ui/Skeleton";
import { useOutletContext } from "react-router-dom";
import Input from "../../components/ui/Input";
import Datepicker from "react-tailwindcss-datepicker";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Overlay from "../../components/ui/Overlay";

const columnData = ({ mutate }) => [
  {
    accessorKey: "",
    header: "NO",
    cell: (props) => (
      <span className="text-sm text-primary">{props.row.index + 1}</span>
    ),
  },
  {
    accessorKey: "Email_UA",
    header: "USER",
    cell: (props) => (
      <span className="text-sm text-primary">{props.getValue()}</span>
    ),
  },
  {
    accessorKey: "Name_UA",
    header: "NAME",
    cell: (props) => (
      <span className="text-sm text-primary">{props.getValue()}</span>
    ),
  },
  {
    accessorKey: "Phone_UA",
    header: "PHONE",
    cell: (props) => (
      <span className="text-sm text-primary">
        {props.getValue() ? props.getValue() : "-"}
      </span>
    ),
  },
  {
    accessorKey: "",
    header: "ACTION",
    cell: (props) => {
      const [editID, setEditID] = useState(null);
      const [loading, setLoading] = useState(false);
      const [isEditing, setIsEditing] = useState();

      const onSubmit = async (values) => {
        setLoading(true);

        try {
          await toast.promise(
            axios.put(`${BASE_URL}${USERS}/update/${editID}`, values, {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  sessionStorage.getItem("token")
                )}`,
              },
              withCredentials: true,
            }),
            {
              pending: `Editing User ${props.row.original.Name_UA}`,
              success: `Edit user ${props.row.original.Name_UA} successfully!`,
              error: {
                render({ data }) {
                  return data.response.data.message;
                },
              },
            }
          );
        } catch (error) {
          console.log(error);
        } finally {
          setIsEditing(false);
          setLoading(false);
          setValues({
            Name_UA: "",
            Phone_UA: "",
          });
          mutate("users");
        }
      };

      const { values, handleChange, handleBlur, handleSubmit, setValues } =
        useFormik({
          initialValues: {
            Name_UA: "",
            Phone_UA: "",
          },
          onSubmit,
        });

      const handleEdit = (id) => {
        setValues({
          Name_UA: props.row.original.Name_UA,
          Phone_UA: props.row.original.Phone_UA,
        });
        setEditID(id);
        setIsEditing(true);
      };
      console.log(editID);

      const handleDelete = async (id) => {
        try {
          await toast.promise(
            axios.delete(`${BASE_URL}${USERS}/delete/${id}`, {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  sessionStorage.getItem("token")
                )}`,
              },
              withCredentials: true,
            }),
            {
              pending: `Deleting User ${props.row.original.Name_UA}`,
              success: `Delete user ${props.row.original.Name_UA} successfully!`,
              error: {
                render({ data }) {
                  return data.response.data.message;
                },
              },
            }
          );
        } catch (error) {
          console.log(error);
        } finally {
          mutate("users");
        }
      };

      return (
        <div className="flex gap-1 items-center text-sm text-primary">
          {isEditing && <Overlay />}
          {isEditing && (
            <div className="size-full absolute z-10 top-0 start-0 flex justify-center items-center">
              <div className="bg-white rounded-lg w-1/2 divide-y-2 divide-gray-200">
                <div className="flex items-center justify-between">
                  <h1 className="text-sm text-primary font-semibold p-4">
                    Edit User
                  </h1>
                  <div
                    className="mr-4 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  >
                    <X size="16px" color="#004D3D" />
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="p-4 flex flex-col">
                  <div>
                    <Input
                      id="Name_UA"
                      htmlFor="Name_UA"
                      label="Name"
                      type="text"
                      placeholder="Name"
                      value={values.Name_UA}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Input
                      id="Phone_UA"
                      htmlFor="Phone_UA"
                      label="Phone"
                      type="text"
                      placeholder="Phone"
                      value={values.Phone_UA}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-primary flex items-center gap-2 justify-center w-min self-end mt-2 text-white px-2.5 py-2 rounded-lg text-sm disabled:text-primary disabled:bg-gray-200"
                    disabled={loading}
                  >
                    Submit
                    {loading ? (
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-200 animate-spin  fill-primary"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : null}
                  </button>
                </form>
              </div>
            </div>
          )}
          <button
            onClick={() => handleEdit(props.row.original.UUID_UA)}
            className="hover:bg-gray-200 px-2 py-1.5 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(props.row.original.UUID_UA)}
            className="hover:bg-gray-200 px-2 py-1.5 rounded-md"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

const UserManagement = () => {
  const [isOpen, setIsOpen] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetcher = async () => {
    const response = await axios.get(`${BASE_URL}${USERS}/find/all`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  const { data } = useSWR("users", fetcher);

  const columns = columnData({ mutate });

  const close = () => {
    setIsOpen(false);
    setValues({
      name: "",
      email: "",
      address: "",
      password: "",
      birthplace: "",
      birthdate: {
        startDate: null,
      },
    });
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);

    try {
      await toast.promise(
        axios.delete(`${BASE_URL}${USERS}/delete`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          withCredentials: true,
        }),
        {
          pending: "Deleting All Users",
          success: "Delete all users successfully!",
          error: {
            render({ data }) {
              return data.response.data.message;
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
      mutate("users");
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);

    const dataValues = {
      ...values,
      password: "123" + values.birthdate.startDate,
      birthdate: values.birthdate.startDate,
    };

    try {
      await toast.promise(
        axios.post(`${BASE_URL}${USERS}/create`, dataValues),
        {
          pending: "Creating User",
          success: "Create user successfully!",
          error: {
            render({ data }) {
              return data.response.data.message;
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setLoading(false);
      setValues({
        name: "",
        email: "",
        address: "",
        password: "",
        birthplace: "",
        birthdate: {
          startDate: null,
        },
      });
      mutate("users");
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      birthplace: "",
      birthdate: {
        startDate: null,
      },
    },
    onSubmit,
  });

  const handleDateSelect = (selectedDate) => {
    const formattedDate = selectedDate;
    setFieldValue("birthdate", formattedDate);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      {isOpen && (
        <div className="size-full absolute z-10 top-0 start-0 flex justify-center items-center">
          <div className="bg-white rounded-lg w-1/2 divide-y-2 divide-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-sm text-primary font-semibold p-4">
                Add User
              </h1>
              <div
                className="mr-4 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer"
                onClick={close}
              >
                <X size="16px" color="#004D3D" />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 flex flex-col">
              <div>
                <Input
                  id="name"
                  htmlFor="name"
                  label="Name"
                  type="text"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  id="email"
                  htmlFor="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  id="address"
                  htmlFor="address"
                  label="Address"
                  type="text"
                  placeholder="Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="grid grid-cols-2 gap-2 items-center">
                  <Input
                    id="birthplace"
                    htmlFor="birthplace"
                    label="Birthplace"
                    type="text"
                    placeholder="Birth Place"
                    value={values.birthplace}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="flex flex-col space-y-1.5 mb-4">
                    <label htmlFor="birthdate" className="text-sm text-primary">
                      Birthdate
                    </label>
                    <Datepicker
                      inputId="birthdate"
                      containerClassName="test relative border border-gray-400 rounded-lg"
                      inputClassName="relative transition-all duration-300 px-2 py-1.5 w-full rounded-lg font-normal text-sm bg-transparent disabled:opacity-40 disabled:cursor-not-allowed focus:outline-primary"
                      toggleClassName="absolute bg-primary rounded-r-lg text-white right-0 h-full px-2 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                      asSingle={true}
                      useRange={false}
                      value={values.birthdate}
                      onChange={handleDateSelect}
                      placeholder="Birth Date"
                      displayFormat="DD/MM/YYYY"
                      primaryColor={"blue"}
                      i18n={"id"}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary flex items-center gap-2 justify-center w-min self-end mt-2 text-white px-2.5 py-2 rounded-lg text-sm disabled:text-primary disabled:bg-gray-200"
                disabled={loading}
              >
                Submit
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin  fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : null}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="flex justify-between items-center">
        <div className="leading-none">
          <h1 className="text-sm">Users</h1>
          <span className="text-xs font-light">Add, Edit, and Delete</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white px-3 py-1.5 text-sm rounded-md flex items-center gap-2"
          >
            Add <Plus size="16px" color="#FFF" />
          </button>
          {!data ? (
            <div className="animate-pulse w-28 h-8 bg-gray-200 rounded-lg self-center"></div>
          ) : (
            <button
              onClick={handleDeleteAll}
              className="bg-primary disabled:text-primary disabled:bg-gray-200 text-white px-3 py-1.5 text-sm rounded-md flex items-center gap-2"
              disabled={isDeleting}
            >
              Delete All
              {isDeleting ? (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin  fill-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <Trash2 size="16px" color="#FFF" />
              )}
            </button>
          )}
        </div>
      </div>
      {/* Title */}

      {/* Content */}
      {!data ? (
        <Skeleton>
          <li className="w-full h-4 bg-gray-200 rounded-full"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full"></li>
        </Skeleton>
      ) : (
        <div className="mt-5">
          <Table columnsData={columns} tableData={data.data} />
        </div>
      )}
      {/* Content */}
    </div>
  );
};

export default UserManagement;
