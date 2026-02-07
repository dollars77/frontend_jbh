const ErrorMessage = ({ message }) => (
  <div
    className="bg-red-50 border border-red-400 text-red-700 px-4 py-0.5 rounded relative text-center my-0.5 w-full"
    role="alert"
  >
    <span className="block sm:inline text-center">{message}</span>

  </div>
);
export default ErrorMessage;