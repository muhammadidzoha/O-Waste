import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ADMINS, BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);

    const loginPromise = axios.post(`${BASE_URL}${ADMINS}/auth`, values);

    toast.promise(loginPromise, {
      pending: "Logging in...",
      success: "Logged in successfully!",
      error: {
        render({ data }) {
          return data.response.data.message;
        },
      },
    });

    try {
      const response = await loginPromise;
      sessionStorage.setItem("token", JSON.stringify(response.data.data));
      navigate("/");
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const { handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div>
      <div className="bg-green-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-green-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex justify-center items-center min-h-screen z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-primary">Sign In</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="">
                <input
                  id="email"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center relative">
                <input
                  maxLength={38}
                  id="password"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  type={show ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute end-5"
                  onClick={() => setShow(!show)}
                >
                  {show ? <Eye size="18px" /> : <EyeOff size="18px" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-x-5 bg-primary text-gray-100 p-3 rounded-lg disabled:text-primary disabled:bg-gray-200"
                disabled={loading}
              >
                Sign in
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
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Login;
