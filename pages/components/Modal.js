import React from "react";

function Modal({ open, onClose, children }) {
  if (!open) return null;

  let maxWidth = "sm:max-w-md";
  React.Children.map(children, (child) => {
    if (child && child.props && child.props.className) {
      const widthClass = child.props.className.match(/w-([a-z]+)/);
      if (widthClass && widthClass[1]) {
        const width = widthClass[1];
        if (width === "sm" || width === "md" || width === "lg") {
          maxWidth = `sm:max-w-${width}`;
        }
      }
    }
  });

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 w-full">
          <div
            className={`relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 ${maxWidth}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 m-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
