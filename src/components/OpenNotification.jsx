// utils/notify.js
export const OpenNotification = ({ message, type = 1 }) => {
  const text = typeof message === "string" ? message : JSON.stringify(message);

  const alertClass =
    type === 1
      ? "alert-success"
      : type === 2
      ? "alert-info"
      : type === 3
      ? "alert-warning"
      : "alert-error";

  const toast = document.createElement("div");
  toast.className = "toast toast-top toast-end z-50 px-20";

  const alert = document.createElement("div");
  alert.className = `alert ${alertClass}`;
  alert.innerHTML = `<span className="text-white">${text}</span>`;

  toast.appendChild(alert);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
