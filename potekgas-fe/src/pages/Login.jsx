/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { login } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  Cookies.remove("user");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function warningNotify(message) {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function successNotify(message, data) {
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => (
        (window.location.href = "dashboard"),
        Cookies.set("user", JSON.stringify(data))
      ),
    });
  }

  function loginUser(e) {
    e.preventDefault();
    var user = {
      username,
      password,
    };

    login(user)
      .then((response) => {
        const status = response.data.status;
        const message = response.data.message;
        const data = response.data.data;
        if (status == 200) {
          successNotify(message, data);
        } else {
          warningNotify(message);
        }
      })
      .catch((error) => {
        // Menampilkan pesan error jika login gagal
        console.error("Error logging in:", error.response);
        warningNotify("Login failed. Please check your credentials.");
      });
  }

  return (
    <><div
      className="container"
      style={{
        backgroundColor: "#074173",
        minHeight: "100vh",
        minWidth: "100%",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div
                    className="col-lg-6 d-none d-lg-block bg-login-image"
                    style={{
                      background: "url(src/assets/Iluspotekblue.png) no-repeat center center",
                      backgroundSize: "cover",
                      height: "85vh", // Set tinggi gambar menjadi 100vh
                    }}
                  ></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4" style={{ fontWeight: "bold" }}>Selamat Datang Di PotekGas!</h1>

                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <div className="position-relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control form-control-user"
                              placeholder="Password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                            <span
                              className="position-absolute top-5 end-0 translate-middle-y"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                cursor: "pointer",
                                top: "1px",
                                marginTop: "14px",
                                right: "15px",
                                zIndex: "2",
                              }}
                            >
                              {showPassword ? (
                                <i className="fas fa-eye"></i>
                              ) : (
                                <i className="fas fa-eye-slash"></i>
                              )}
                            </span>
                          </div>
                        </div>
                        {/* Memanggil fungsi loginUser saat tombol login diklik */}
                        <button
                          className="btn btn-primary btn-user btn-block"
                          onClick={loginUser}
                        >
                          Masuk
                        </button>
                        <ToastContainer />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default Login;
