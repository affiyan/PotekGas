/* eslint-disable no-unused-vars */
import HeaderComponent from "./components/template/Sidebar";
import FooterComponent from "./components/template/Footer";
import NavbarComponent from "./components/template/Navbar";
import NotFound from "./pages/NotFound";
import TabelObat from "./components/obat/TabelObat";
import FormObat from "./components/obat/FormObat";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TabelPengguna from "./components/user/TabelPengguna";
import FormPengguna from "./components/user/FormPengguna";
import Dashboard from "./pages/Dashboard";
import TabelPembelian from "./components/transaksi/TabelPembelian";
import DetailPembelian from "./components/transaksi/DetailPembelian";
import Pembelian from "./components/transaksi/Pembelian";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const currentURL = window.location.href;

  // Memeriksa apakah user sedang berada di URL tertentu
  const isLocalhost1234 = currentURL === "http://localhost:1234/";

  return (
    <>
      <BrowserRouter>
        {isLocalhost1234 ? (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        ) : (
          <>
            <div id="wrapper">
              <HeaderComponent />
              <div id="content-wrapper" className="d-flex flex-column">
                <NavbarComponent />
                {/* Main Content */}
                <div id="content" className="container-fluid">
                  <div className="page-wrapper">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/data-obat" element={<TabelObat />} />
                      <Route path="/form-obat" element={<FormObat />} />
                      <Route path="/form-obat/:id" element={<FormObat />} />
                      <Route
                        path="/data-pengguna"
                        element={<TabelPengguna />}
                      />
                      <Route path="/form-pengguna" element={<FormPengguna />} />
                      <Route
                        path="/form-pengguna/:id"
                        element={<FormPengguna />}
                      />
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
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
                {/* End of Content Wrapper */}
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
                    Pilih Keluar Untuk Keluar Dari Program.
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
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
