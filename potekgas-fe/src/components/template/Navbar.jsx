/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "../../services/UserService"; // Menggunakan getUserById dari UserService
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {
  savePembelian,
  saveDetailPembelian,
  countPembelian,
} from "../../services/PembelianService";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const [id, setId] = useState(0);
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [idTransaksi, setIdTransaksi] = useState(0);
  const [userId, setUserId] = useState(null);
  const [totalHarga, setTotalHarga] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [message, setMessage] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   // Fungsi untuk menghapus cookies cartItems saat logout
   const handleLogout = () => {
    Cookies.remove("cartItems");
  };

  const open = Boolean(anchorEl);
  const idpopover = open ? "simple-popover" : undefined;

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

  function successNotify(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => window.location.reload(),
    });
  }

  useEffect(() => {
    const getTotalHarga = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.total_harga;
      });
      return total;
    };

    // Menggunakan fungsi getTotalHarga untuk menghitung total harga
    setTotalHarga(getTotalHarga());
  }, [cartItems]);

  useEffect(() => {
    countPembelian()
      .then((response) => {
        setIdTransaksi(response.data.data[0] + 1);
      })
      .catch((error) => {
        console.error("Error saving Obat:", error);
      });

    countPembelian();
  }, []);
  // console.log(cartItems)

  function saveTransaksi(e) {
    e.preventDefault();
  
    // Mendapatkan data transaksi
    const formDataPembelian = [
      { idTransaksi: idTransaksi, idUser: userId, totalHarga: totalHarga },
    ];
  
    // Mendapatkan data detail pembelian dari keranjang
    const mappedDataDetail = cartItems.map((item) => ({
      idDetail: 0,
      idTransaksi: idTransaksi,
      idObat: item.id_obat,
      jumlah: item.kuantitas,
    }));
  
    if (mappedDataDetail.length === 0) {
      warningNotify("Harap Memilih Obat!");
    } else {
      savePembelian(formDataPembelian[0])
        .then((response) => {
          const status = response.data.status;
          const message = response.data.message;
          if (status === 200) {
            setMessage(message);
            saveDetailPembelian(mappedDataDetail)
              .then((response) => {
                const status = response.data.status;
                if (status === 200) {
                  // Transaksi berhasil, kurangi stok obat
                  cartItems.forEach((item) => {
                    const newStock = item.stok - item.kuantitas;

                  });
                  successNotify(message);
                } else {
                  warningNotify(message);
                }
              })
              .catch((error) => {
                console.error("Error saving Obat:", error);
              });
            } else {
              warningNotify(message);
            }
          })
          .catch((error) => {
            console.error("Error saving Obat:", error);
          });
  
      Cookies.remove("cartItems");
    }
  }
  
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
        <div className="nav-item">
          <a
            aria-describedby={idpopover}
            className="nav-link"
            onClick={handleClick}
          >
            <FaShoppingCart />
            <span className="badge badge-danger badge-counter">
              {cartItemCount}
            </span>
          </a>
          <Popover
            id={idpopover}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              style: {
                maxWidth: "500px", // Atur lebar maksimum popover
                width: "100%", // Atur lebar popover agar selalu 100% dari lebar maksimum
              },
            }}
          >
           <div className="modal-header">
                <h5
                  className="modal-title"
                  id="exampleModalLabel"
                  style={{ fontWeight: "bold" }}
                >
                  Detail Pembelian : 
                </h5>
                <button
                  className="close"
                  type="button"
                  onClick={handleClose}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            <div
            className="modal-body"
              style={{
                padding: "10px",
                minWidth: "400px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginRight: "20px",
                      marginLeft: "20px",
                      justifyContent: "space-between", // Menempatkan harga obat di sebelah kanan
                    }}
                  >
                    <img
                      src={
                        item.gambarUrl ||
                        `http://localhost:8083/obats/gambar/${item.id_obat}`
                      }
                      alt={"... ......"}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                        // marginRight: "20px",
                      }}
                    />
                    <span style={{ marginLeft: "10px", marginRight: "50px" }}>
                      {item.namaObat} x {item.kuantitas}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          color: "#2850c3",
                          fontSize: "12.5px",
                          fontWeight: "bold",
                        }}
                      >
                        {formatRupiah(item.total_harga)}
                      </span>
                    </div>
                  </span>
                ))
              ) : (
                <div>No items in cart</div>
              )}
            </div>
            <hr />
            <div
              style={{
                padding: "10px",
                minWidth: "400px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="row">
                <div className="col">
                  {" "}
                  <span style={{ textAlign: "left" }}>
                    Total :{" "}
                    <span
                      style={{
                        color: "#2850c3",
                        fontWeight: "bold",
                      }}
                    >
                      {formatRupiah(totalHarga)}
                    </span>
                  </span>
                </div>
                <div className="col" style={{ textAlign: "right" }}>
                  {" "}
                  <button className="btn btn-primary" onClick={saveTransaksi}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </Popover>
        </div>
        <ToastContainer />

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
              onClick={handleLogout} 
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
