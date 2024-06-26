/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import HeaderComponent from "./components/template/Sidebar";
import FooterComponent from "./components/template/Footer";
import NavbarComponent from "./components/template/Navbar";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import TabelObat from "./components/obat/TabelObat";
import FormObat from "./components/obat/FormObat";
import TabelPengguna from "./components/user/TabelPengguna";
import FormPengguna from "./components/user/FormPengguna";
import Dashboard from "./pages/Dashboard";
import TabelPembelian from "./components/transaksi/TabelPembelian";
import DetailPembelian from "./components/transaksi/DetailPembelian";
import Pembelian from "./components/transaksi/Pembelian";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { checkToken } from "./services/UserService";
import Cookies from "js-cookie";

function App() {
  const currentURL = window.location.href;
  const isLocalhost1234 = currentURL === "http://localhost:1234/";

  const [isValid, setIsValid] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        const token = userData[0].token;

        checkToken(token).then((response) => {
          if (response.status === 200) {
            if (response.data.data[0].role != 1 && response.data.data[0].role != 2){
              Cookies.remove('user')
              // console.log(response.data.data[0].role)
            }
            setIsValid(true);
            setUserRole(response.data.data[0].role); 
          } else {
            setIsValid(false);
            console.log(response.status);
          }
        });
      } catch (error) {
        console.log("Error parsing user cookie:", error);
      }
    } 
  }, []);

  return (
    <>
      <BrowserRouter>
        {isLocalhost1234 ? (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ) : (
          <>
            {isValid ? (
              <>
                <div id="wrapper">
                  <HeaderComponent />
                  <div id="content-wrapper" className="d-flex flex-column">
                    <NavbarComponent />
                    <div id="content" className="container-fluid">
                      <div className="page-wrapper">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/dashboard" element={<Dashboard />} />

                          {userRole === 1 && (
                            <>
                              <Route
                                path="/data-obat"
                                element={<TabelObat />}
                              />
                              <Route path="/form-obat" element={<FormObat />} />
                              <Route
                                path="/form-obat/:id"
                                element={<FormObat />}
                              />
                              <Route
                                path="/data-pengguna"
                                element={<TabelPengguna />}
                              />
                              <Route
                                path="/form-pengguna"
                                element={<FormPengguna />}
                              />
                              <Route
                                path="/form-pengguna/:id"
                                element={<FormPengguna />}
                              />
                              {/* <Route path="/" element={<Pembelian />} /> */}
                              <Route
                                path="/data-pembelian"
                                element={<TabelPembelian />}
                              />
                              <Route
                                path="/data-detailpembelian"
                                element={<DetailPembelian />}
                              />
                            </>
                          )}
                          {userRole === 2 && (
                            <>
                              <Route path="/" element={<Pembelian />} />
                              <Route
                                path="/data-pembelian"
                                element={<TabelPembelian />}
                              />
                              <Route
                                path="/data-detailpembelian"
                                element={<DetailPembelian />}
                              />
                              <Route
                                path="/form-Pembelian"
                                element={<Pembelian />}
                              />
                            </>
                          )}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </div>
                    <FooterComponent />
                  </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                  <i className="fas fa-angle-up"></i>
                </a>
                <div
                  className="modal fade"
                  id="logoutModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="exampleModalLabel"
                          style={{ fontWeight: "bold" }}
                        >
                          Keluar
                        </h5>
                        <button
                          className="close"
                          type="button"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Pilih Keluar Untuk Keluar Dari PotekGas.
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          data-dismiss="modal"
                        >
                          Batal
                        </button>
                        <a className="btn btn-danger font-weight-bold" href="/">
                          Keluar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Routes>
                <Route path="*" element={<Unauthorized />} />
              </Routes>
            )}
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
