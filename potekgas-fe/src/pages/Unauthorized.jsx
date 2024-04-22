/* eslint-disable no-unused-vars */
import React from "react";

function Unauthorized() {
  return (
    <div className="container-fluid">
      {/* 404 Error Text */}
      <div className="text-center">
        <div className="error mx-auto" data-text="401">
          401
        </div>
        <p className="lead text-gray-800 mb-5">Unauthorized</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <a href="/">← Back to Login</a>
      </div>
    </div>
  );
}

export default Unauthorized;
