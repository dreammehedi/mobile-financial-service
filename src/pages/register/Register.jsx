import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  // navigate
  const navigate = useNavigate();

  // handle register form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // validation user number
  const validateMobileNumber = (value) => {
    const numberPattern = /^[0-9]{11,15}$/;
    if (numberPattern.test(value)) {
      return true;
    }
    return "Enter a valid mobile number!";
  };

  // validation user email
  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(value)) {
      return true;
    }
    return "Enter a valid email address!";
  };
  // hanlde register fn
  const handleRegister = async (data) => {
    try {
      // register a new account in the database
      const response = await axios.post(
        "http://localhost:5000/api/register",
        data
      );
      const resData = await response.data;
      if (resData?.success) {
        reset();
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          confirmButtonText: "Please Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        timer: 7000,
      });
    }
  };
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Register</title>
      </Helmet>

      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex justify-center items-center">
        <div className="flex items-center justify-center ">
          <div className="container bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* page title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Register
            </h2>
            {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
            {/* register form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
              {/* name field */}
              <div>
                <label className="text-sm text-gray-700">Name</label>
                <input
                  {...register("name", {
                    required: "Name is required!",
                  })}
                  type="text"
                  placeholder="Enter Your Name..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
                {errors.name && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* PIN field */}
              <div>
                <label className="text-sm text-gray-700">PIN</label>
                <input
                  {...register("pin", {
                    required: "PIN is required!",
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

              {/* mobile field */}
              <div>
                <label className="text-sm text-gray-700">Mobile Number</label>
                <input
                  {...register("mobileNumber", {
                    required: "Mobile Number is required!",
                    validate: validateMobileNumber,
                  })}
                  type="number"
                  placeholder="Enter Mobile Number..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
                {errors.mobileNumber && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.mobileNumber.message}
                  </span>
                )}
              </div>

              {/* email field */}
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                    validate: validateEmail,
                  })}
                  type="email"
                  placeholder="Enter Your Email Address..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
                {errors.email && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* role field */}
              <div>
                <label className="text-sm text-gray-700">Role</label>
                <select
                  {...register("role", { required: "Role is required!" })}
                  placeholder="Role..."
                  className="text-sm w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>
                {errors.role && (
                  <span className="text-xs font-medium font-inter text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </div>

              {/* register button */}
              <button
                type="submit"
                className="w-full font-medium bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 my-transition"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-gray-700 my-transition">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="my-transition text-blue-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
