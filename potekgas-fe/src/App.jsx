/* eslint-disable no-unused-vars */
import HeaderComponent from "./components/Sidebar";
import FooterComponent from "./components/Footer";
import HomeComponent from "./components/Content";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div id="wrapper">
          <HeaderComponent />
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              <HomeComponent />
              {/* <Routes>
          <Route path="/" element={<ListUserComponent />}></Route>
          <Route path="/user" element={<ListUserComponent />}></Route>
          <Route path="/add-user" element={<UserComponent />}></Route>
          <Route path="/update-user/:id" element={<UserComponent />}></Route>
          <Route path="/prodi" element={<ListProdiComponent />}></Route>
          <Route path="/add-prodi" element={<ProdiComponent />}></Route>
          <Route path="/update-prodi/:id" element={<ProdiComponent />}></Route>
          <Route path="/skema" element={<ListSkemaComponent />}></Route>
          <Route path="/add-skema" element={<SkemaComponent />}></Route>
          <Route path="/update-skema/:id" element={<SkemaComponent />}></Route>
        </Routes> */}
              <FooterComponent />
            </div>
            {/* End of Content Wrapper */}
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
