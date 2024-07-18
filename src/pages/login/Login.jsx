import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AxiosPublic from "./../../axios/AxiosPublic";

const Login = () => {
  // navigate
  const navigate = useNavigate();

  // get user token
  const token = localStorage.getItem("token");

  // handle login form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // validation user email / number
  const validateEmailOrNumber = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberPattern = /^[0-9]{11,15}$/;
    if (emailPattern.test(value) || numberPattern.test(value)) {
      return true;
    }
    return "Enter a valid mobile number or email address!";
  };

  // handle login fn
  const handleLogin = async (data) => {
    try {
      // login user in the database
      const response = await AxiosPublic.post("/login", {
        identifier: data?.loginNumberOrEmail,
        pin: data?.pin,
      });
      const resData = await response.data;

      // check before user login , user account is activated by admin
      if (resData?.status !== "active") {
        Swal.fire({
          title: `Account ${resData?.status}!`,
          text: `Your account is currently ${resData?.status}. Please wait for Admin Approval!`,
          icon: "warning",
          showConfirmButton: true,
        });
        return;
      }

      // after account active and token is valid then login
      if (resData?.success && resData?.status === "active") {
        reset();
        Swal.fire({
          title: "Login Successful",
          text: "You have successfully logged in!",
          icon: "success",
          timer: 1000,
        });
        localStorage.setItem("token", resData?.token);
        navigate("/");
        // window.location.reload();
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        timer: 700,
      });
    }
  };

  // check user already logged in then redirect to the main page
  if (token) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Login</title>
      </Helmet>

      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex justify-center items-center">
        <div className="flex items-center justify-center ">
          <div className="container bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* page title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Login
            </h2>
            {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* mobile number/email field */}
              <div>
                <label className="text-sm text-gray-700">
                  Mobile Number / Email
                </label>
                <input
                  {...register("loginNumberOrEmail", {
                    required: "Mobile Number / Email is required!",
                    validate: validateEmailOrNumber,
                  })}
                  type="text"
                  placeholder="Enter Your Number / Email..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />

                {errors.loginNumberOrEmail && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.loginNumberOrEmail.message}
                  </span>
                )}
              </div>

              {/* PIN field */}
              <div>
                <label className="text-sm text-gray-700">PIN</label>
                <input
                  {...register("pin", {
                    required: "PIN is required",
                    pattern: {
                      value: /^[0-9]{5}$/,
                      message: "PIN must be a 5-digit number!",
                    },
                  })}
                  type="password"
                  placeholder="Enter Your PIN..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
                {errors.pin && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.pin.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full font-medium bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 my-transition"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-gray-700 my-transition">
              {`Don't have an account?`}{" "}
              <Link
                to={"/register"}
                className="my-transition text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
