import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Register = () => {
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
            <form className="space-y-4">
              {/* name field */}
              <div>
                <label className="text-sm text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
              </div>

              {/* PIN field */}
              <div>
                <label className="text-sm text-gray-700">PIN</label>
                <input
                  type="password"
                  name="pin"
                  placeholder="Enter Your PIN..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
              </div>

              {/* mobile field */}
              <div>
                <label className="text-sm text-gray-700">Mobile Number</label>
                <input
                  type="number"
                  name="mobileNumber"
                  placeholder="Enter Mobile Number..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
              </div>

              {/* email field */}
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email Address..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                />
              </div>

              {/* role field */}
              <div>
                <label className="text-sm text-gray-700">Role</label>
                <select
                  name="role"
                  placeholder="Role..."
                  className="text-sm w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>
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
