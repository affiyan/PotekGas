/* eslint-disable no-unused-vars */
import React from "react";

function Unauthorized() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {/* 404 Error Text */}
      <div className="text-center">
        <div className="error mx-auto" data-text="401">
          401
        </div>
        <p className="lead text-gray-800 mb-5" style={{ fontWeight:'bold', fontSize: '40px' }}>Unauthorized</p>
        <p className="text-gray-500 mb-0" style={{ fontWeight:'bold' }}>
          It looks like you found a glitch in the matrix...
        </p>
        <hr />
        <a href="/" style={{ fontWeight:'bold' }}>← Back to Login</a>
      </div>
    </div>
  );
}

export default Unauthorized;
