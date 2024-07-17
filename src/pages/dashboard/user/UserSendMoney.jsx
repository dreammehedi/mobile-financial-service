import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AxiosSecure from "./../../../axios/AxiosSecure";

function UserSendMoney() {
  // handle send money form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSendMoney = async (data) => {
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

    // recipient Information collect
    let recipientInfo = {
      recipient: data?.mobileNumber,
      amount: parseInt(data?.amount),
      PIN: data?.pin,
    };

    // amount is 100 + then fee is 5 taka
    if (data?.amount > 100) {
      recipientInfo.amount += 5; // Add fee in 100 taka to 5 taka
    }

    try {
      const response = await AxiosSecure.post(
        "/user-send-money",
        recipientInfo
      );
      const resData = await response.data;
      console.log(resData);
      if (resData?.transactionId) {
        reset();
        Swal.fire({
          title: "Success",
          text: `Transaction successful! Transaction ID: ${response.data.transactionId}`,
          icon: "success",
          showConfirmButton: true,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `Transaction failed: ${
          err.response?.data?.message || err.message
        }`,
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
      {/* send money */}
      <section className="w-full md:max-w-xl md:mx-auto rounded-md border border-gray-200 p-4 md:p-6 bg-gray-100">
        <h2 className="text-2xl mb-4">Send Money</h2>
        <form onSubmit={handleSubmit(handleSendMoney)} className="space-y-4">
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
            Send Money
          </button>
        </form>
      </section>
    </>
  );
}

export default UserSendMoney;