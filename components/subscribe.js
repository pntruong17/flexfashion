import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleAddEmail = async () => {
    const newData = { name: "", age: "" };
    const result = await updateEmail(email, newData);
  };

  function handleSubmit(event) {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của email
    if (!email || !isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    // Lưu email vào Firestore hoặc gửi email đến server
    handleAddEmail();

    // Reset giá trị của input
    setEmail("");
    setIsEmailValid(true);
  }

  function handleChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(true);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  return (
    <div className="border border-gray-400 my-10">
      <div className="rounded-3xl bg-_accent_dark px-5 sm:px-40 py-10 my-10 mx-2 flex flex-col">
        <h2 className="text-5xl font-Baskerville text-center text-_bg_dark">
          Subscribe and Enjoy 20% off
        </h2>
        <p className="text-center font-flexrow text-_bg_dark mt-3 ">
          Discover new arrivals and inspiration, plus get 20% off your first
          order on full-priced items.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-5">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter your email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="flex-grow font-flexrow bg-gray-100 bg-opacity-50  border border-gray-400 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-5 mt-3 leading-8 transition-colors duration-200 ease-in-out"
            />

            <button
              type="submit"
              className="text-white font-flexrow bg-black  border-0 py-3 px-5 focus:outline-none sm:ml-5 text-lg mt-3"
            >
              Subscribe
            </button>
          </form>
        </div>
        {!isEmailValid && (
          <span className="w-full text-center text-_red mt-5">
            Email is not available, please collect later
          </span>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
