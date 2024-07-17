import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AxiosSecure from "./../../../axios/AxiosSecure";

function UserCashIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle cash in money form agent
  const handleCashIn = async (data) => {
    // check amount is 50 or not
    if (data?.amount < 50) {
      Swal.fire({
        title: "Error",
        text: "Amount should be more than 50!",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    // amount
    const amount = parseInt(data?.amount);

    // recipient Information collect
    let recipientInfo = {
      recipient: data?.mobileNumber,
      amount: amount,
      PIN: data?.pin,
    };

    try {
      const response = await AxiosSecure.post("/user-cash-in", recipientInfo);
      const resData = await response.data;
      if (resData?.insertedId) {
        reset();
        Swal.fire({
          title: "Cash In Request Successful",
          text: "Your money request has been successfully for agent. Wait for agent Confirmation. Agent confirm your account cash in success!",
          icon: "success",
          showConfirmButton: true,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  // validation user number
  const validateMobileNumber = (value) => {
    const numberPattern = /^[0-9]{11,15}$/;
    if (numberPattern.test(value)) {
      return true;
    }
    return "Enter a valid mobile number!";
  };

  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - User Dashboard - Cash In</title>
      </Helmet>

      {/* send money */}
      <section className="w-full md:max-w-xl md:mx-auto rounded-md border border-gray-200 p-4 md:p-6 bg-gray-100">
        <h2 className="text-2xl mb-4">Cash In</h2>
        <form onSubmit={handleSubmit(handleCashIn)} className="space-y-4">
          {/* mobile field */}
          <div>
            <label className="text-sm text-gray-700">Agent Mobile Number</label>
            <input
              {...register("mobileNumber", {
                required: "Mobile Number is required!",
                validate: validateMobileNumber,
              })}
              type="number"
              placeholder="Enter Agent Number..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
            />
            {errors.mobileNumber && (
              <span className="text-xs font-medium font-inter text-red-500">
                {errors.mobileNumber.message}
              </span>
            )}
          </div>

          {/* Amount field */}
          <div>
            <label className="text-sm text-gray-700">Amount</label>
            <input
              {...register("amount", {
                required: "Amount is required!",
              })}
              type="number"
              placeholder="Enter Your Amount..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 my-transition placeholder:text-sm"
            />
            {errors.amount && (
              <span className="text-xs font-medium font-inter text-red-500">
                {errors.amount.message}
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

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Cash In
          </button>
        </form>
      </section>
    </>
  );
}

export default UserCashIn;
