/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "../../services/UserService"; // Menggunakan getUserById dari UserService
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
// import {
//   savePembelian,
//   saveDetailPembelian,
// } from "../../services/PembelianService";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function Navbar() {
  const [id, setId] = useState(0);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = Cookies.get("user");

      if (userData != null) {
        const userObj = JSON.parse(userData);
        const userId = userObj[0].id;
        setId(userObj[0].id);
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

  useEffect(() => {
    const cartItem = Cookies.get("cartItems");
    if (cartItem != null) {
      const cartItems = JSON.parse(cartItem);
      console.log("Cart Items:", cartItems); // Debugging log
      setCartItems(cartItems);
      setCartItemCount(cartItems.length);
    } else {
      setCartItemCount(0);
    }
  }, []);

  const formatRupiah = (total_harga) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(total_harga);
  };


  

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Tombol sidebar */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* Form pencarian */}
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

      {/* Tombol keranjang */}
      <ul className="navbar-nav ml-auto">
        {/* Tombol keranjang dropdown */}
        <div className="nav-item mx-1">
          <a
            className="nav-link"
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <FaShoppingCart />
            <span className="badge badge-danger badge-counter">
              {cartItemCount}
            </span>
          </a>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <div>
              <div style={{ marginTop: "10px", marginLeft: "10px", color: "#999" }}>Baru ditambahkan</div>
            </div>
            <div style={{ padding: "10px", minWidth: "400px" }}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ border: "1px solid #ddd", padding: "5px", borderRadius: "5px" }}>
                      <img src={item.gambarUrl || `http://localhost:8083/obats/gambar/${item.id_obat}`} alt={item.namaObat} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                    </div>
                    <div style={{ marginLeft: "10px", marginRight: "50px" }}> 
                      <div>{item.namaObat}</div>
                    </div>
                    <div>
                    <div style={{ color: "#6f42c1" }}> {formatRupiah(item.total_harga)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No items in cart</div>
              )}
            </div><br></br><br></br>
            <div style={{ position: "absolute", bottom: 0, right: 0, marginTop: "100px", marginBottom: "10px", marginRight: "10px" }}>
              <button className="btn btn-primary">Checkout</button>
            </div>
          </Popover>
        </div>

        {/* Tombol beli */}
        <li className="nav-item">
          <a className="nav-link">Beli</a>
        </li>

        {/* Divider */}
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Dropdown user */}
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
              src={
                foto !== null
                  ? `http://localhost:8083/users/foto/${id}`
                  : "../public/assets/img/undraw_profile.svg"
              }
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