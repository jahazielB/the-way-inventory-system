

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 text-center px-4">
      {/* 404 Number */}
      <div className="relative">
        <h1 className="text-[100px] sm:text-[150px] font-extrabold text-gray-200 relative leading-none">
          404
          <span className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden">
            <span className="absolute inset-0 bg-blue-600/80 translate-y-[50%] rounded-t-full"></span>
          </span>
        </h1>
      </div>

      {/* Fish line */}
      <div className="flex items-center justify-center mt-4 mb-8">
        <div className="h-1 w-24 sm:w-32 bg-blue-600"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 fill-current"
        >
          <path d="M59.5 32c-3-2.5-6.4-4-9.5-4.8 0-.4.1-.8.1-1.2 0-7.7-8.7-14-19.5-14S11 18.3 11 26c0 .4 0 .8.1 1.2C8 28 4.5 29.5 1.5 32c3 2.5 6.4 4 9.5 4.8 2.1 7.2 10.1 12.4 19.5 12.4s17.4-5.2 19.5-12.4c3.1-.8 6.5-2.3 9.5-4.8zM32 38a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
        </svg>
      </div>

      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md text-sm sm:text-base">
        Sorry, the page you’re looking for does not exist or has been moved.
        Please go back to the Home page.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all"
      >
        Go back Home
      </button>
    </div>
  );
};

export default NotFound;
