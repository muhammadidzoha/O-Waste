import React, { useState } from "react";
import { Plus, Trash2, X, Image } from "lucide-react";
import axios from "axios";
import { ARTICLES, BASE_URL } from "../../config";
import useSWR, { mutate } from "swr";
import { useOutletContext } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton";
import Table from "../../components/ui/Table";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import InputBox from "../../components/ui/InputBox";
import InputFile from "../../components/ui/InputFile";
import { useFormik } from "formik";

const columnData = ({ mutate }) => [
  {
    accessorKey: "",
    header: "NO",
    cell: (props) => (
      <span className="text-sm text-primary">{props.row.index + 1}</span>
    ),
  },
  {
    accessorKey: "Title_AD",
    header: "TITLE",
    cell: (props) => (
      <span className="text-sm text-primary">{props.getValue()}</span>
    ),
  },
  {
    accessorKey: "Description_AD",
    header: "DESCRIPTION",
    cell: (props) => (
      <div className="text-sm max-w-72 text-justify text-primary">
        <span>{props.getValue()}</span>
      </div>
    ),
  },
  {
    accessorKey: "Image_AD",
    header: "IMAGE",
    cell: (props) => <img src={props.getValue()} alt="article" width={50} />,
  },
  {
    accessorKey: "",
    header: "ACTION",
    cell: (props) => {
      const handleDelete = async (id) => {
        await toast.promise(
          axios.delete(`${BASE_URL}${ARTICLES}/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
            },
            withCredentials: true,
          }),
          {
            pending: `Deleting Article ${props.row.original.Title_AD}`,
            success: `Delete Article ${props.row.original.Title_AD} successfully!`,
            error: {
              render({ data }) {
                return data.response.data.message;
              },
            },
          }
        );

        try {
          await axios.delete(`${BASE_URL}${ARTICLES}/${id}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                sessionStorage.getItem("token")
              )}`,
            },
            withCredentials: true,
          });
        } catch (error) {
          console.log(error);
        } finally {
          mutate("articles");
        }
      };

      return (
        <div className="flex gap-1 items-center text-sm text-primary">
          <button
            onClick={() => handleDelete(props.row.original.UUID_AD)}
            className="hover:bg-gray-200 px-2 py-1.5 rounded-md"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];

const ArticleManagement = () => {
  const [isOpen, setIsOpen] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetcher = async () => {
    const response = await axios.get(`${BASE_URL}${ARTICLES}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  const { data } = useSWR("articles", fetcher);

  const columns = columnData({ mutate });

  const close = () => {
    setIsOpen(false);
    setFieldValue("image", null);
    setPreview(null);
    setValues({
      title: "",
      description: "",
    });
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);

    try {
      await toast.promise(
        axios.delete(`${BASE_URL}${ARTICLES}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          withCredentials: true,
        }),
        {
          pending: "Deleting All Articles",
          success: "Delete all articles successfully!",
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
      mutate("articles");
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", values.title);
    formDataToSend.append("description", values.description);
    formDataToSend.append("image", values.image);

    try {
      await toast.promise(
        axios.post(`${BASE_URL}${ARTICLES}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              sessionStorage.getItem("token")
            )}`,
          },
          withCredentials: true,
        }),
        {
          pending: "Creating Article",
          success: "Create article successfully!",
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
      close();
      setLoading(false);
      setValues({
        title: "",
        description: "",
        image: null,
      });
      mutate("articles");
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
      title: "",
      description: "",
      image: null,
    },
    onSubmit,
  });

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setPreview(URL.createObjectURL(image));
    setFieldValue("image", image);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      {isOpen && (
        <div className="size-full absolute z-10 top-0 start-0 flex justify-center items-center">
          <div className="bg-white rounded-lg w-1/2 divide-y-2 divide-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-sm text-primary font-semibold p-4">
                Add Article
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
                  id="title"
                  htmlFor="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputBox
                  htmlFor="description"
                  label="Description"
                  id="description"
                  rows={3}
                  placeholder="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {preview ? (
                  <InputFile
                    htmlFor="image"
                    label="Image"
                    icon={
                      <Image
                        aria-hidden="true"
                        className={`mx-auto h-12 w-12 text-gray-300 ${
                          preview ? "relative left-24" : ""
                        }`}
                      />
                    }
                    title="Change file"
                    description="or drag and drop"
                    rules="PNG, JPG, GIF up to 10MB"
                    id="image"
                    onChange={handleFileChange}
                    src={preview}
                    alt="review"
                    className="absolute w-[250px] min-h-[190px] max-h-[190px] top-0 left-0"
                  />
                ) : (
                  <InputFile
                    htmlFor="image"
                    label="Image"
                    icon={
                      <Image
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                    }
                    title="Upload a file"
                    description="or drag and drop"
                    rules="PNG, JPG, GIF up to 10MB"
                    id="image"
                    onChange={handleFileChange}
                  />
                )}
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
          <h1 className="text-sm">Articles</h1>
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

export default ArticleManagement;
