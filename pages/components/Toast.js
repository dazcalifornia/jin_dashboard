import React from "react";

const Toast = ({ message }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 ">
      <div className="toast bg-emerald-400 text-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-3">
          <div className="flex justify-between">
            <div className="toast-body">{message}</div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
