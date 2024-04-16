/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "../../services/UserService"; // Menggunakan getUserById dari UserService
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [id, setId] = useState(0);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = Cookies.get("user");

      if (userData != null) {
        const userObj = JSON.parse(userData);
        const userId = userObj[0].id;
        setId(userObj[0].id)
        setUserId(userId);

        try {
          const response = await getUser(userId);
          const responseData = response.data.data[0];
          setFoto(responseData.foto);
          setNama(responseData.nama);
          setRole(responseData.role);
          // if (responseData.role === "1") {
          //   setRole("Admin");
          // } else if (responseData.role === "2") {
          //   setRole("Kasir");
          // }
        } catch (error) {
          // Sembunyikan pesan kesalahan dari console.log
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.kuantitas, 0);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-search fa-fw"></i>
          </a>
          
          <div
            className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown no-arrow mx-1">{/* Alerts */}</li>

        <div className="nav-item no-arrow mx-1">
          <a className="nav-link">
            <FaShoppingCart />
            <span className="badge badge-danger badge-counter">{cartItemCount}</span>
          </a>
        </div>

        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {nama}
            </span>
            <div className="topbar-divider"></div> {/* Divider di sini */}
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {role}
            </span>
            <img
              className="img-profile rounded-circle"
              src={foto !== null ? `http://localhost:8083/users/foto/${id}` : '../public/assets/img/undraw_profile.svg'}
              alt="Profile"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
