/* eslint-disable no-unused-vars */
import HeaderComponent from "./components/Sidebar";
import FooterComponent from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import TabelObat from "./pages/TabelObat";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TabelPengguna from "./pages/TabelPengguna";
import Dashboard from "./pages/Dashboard";
import TabelPembelian from "./pages/TabelPembelian";
import DetailPembelian from "./pages/DetailPembelian";

function App() {
  return (
    <>
      <BrowserRouter>
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
                  <Route path="/data-pengguna" element={<TabelPengguna />} />
                  <Route path="/data-pembelian" element={<TabelPembelian />} />
                  <Route path="/data-detailpembelian" element={<DetailPembelian />} />
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

        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" href="login.html">Logout</a>
                    </div>
                </div>
            </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
