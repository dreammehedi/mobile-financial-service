import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex justify-center items-center">
        <div className="flex items-center justify-center ">
          <div className="container bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* page title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Login
            </h2>
            {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
            <form className="space-y-4">
              {/* mobile number/email field */}
              <div>
                <label className="text-sm text-gray-700">
                  Mobile Number / Email
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Number / Email..."
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
