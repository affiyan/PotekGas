/* eslint-disable no-unused-vars */
import React from "react";

function NotFound() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      {/* 404 Error Text */}
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5" style={{ fontWeight:'bold', fontSize: '40px' }}>Page Not Found</p>
        <p className="text-gray-500 mb-0" style={{ fontWeight:'bold' }}>
          It looks like you found a glitch in the matrix...
        </p>
        <hr />
        <a href="/dashboard" style={{ fontWeight:'bold' }}>← Back to Dashboard</a>
      </div>
    </div>
  );
}

export default NotFound;
