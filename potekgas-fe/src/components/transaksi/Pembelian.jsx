/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { listObats, deleteObat } from "../../services/ObatService";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Toast } from "react-bootstrap";
import gambar from "../../assets/paracetramol.jpg";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pembelian() {
  const [obats, setObats] = useState([]);
  const [selectedObat, setSelectedObat] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [toastShow, setToastShow] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigator = useNavigate();

  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    loadObats();
  }, []);

  const loadObats = () => {
    listObats()
      .then((response) => {
        setObats(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatRupiah = (harga) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(harga);
  };

  const formatExpired = (expired) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(expired).toLocaleDateString("id-ID", options);
  };

  function formObatHandler() {
    navigator("/form-obat");
  }

  const handleBeli = (obat) => {
    setSelectedObat(obat);
    // setShowModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = obats.slice(indexOfFirstItem, indexOfLastItem);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedObat(null);
    setQuantity(1);
  };

  const handleBeliConfirm = () => {
    // Implementasi logika beli obat di sini
    console.log("Membeli obat:", selectedObat, "dengan kuantitas:", quantity);
    handleCloseModal();
  };

  useEffect(() => {
    // Ambil data cartItems dari cookies saat komponen dimuat
    const existingCartItems = Cookies.get("cartItems");
    if (existingCartItems) {
      setCartItems(JSON.parse(existingCartItems));
    }
  }, []);
  
  const addToCart = () => {
    // Cek apakah item sudah ada di dalam keranjang
    const existingItemIndex = cartItems.findIndex(item => item.id_obat === selectedObat.id);
    
    if (existingItemIndex !== -1) {
      // Jika item sudah ada di dalam keranjang, update stok-nya
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].kuantitas += quantity;
      updatedCartItems[existingItemIndex].total_harga += selectedObat.harga * quantity;
  
      // Simpan data cartItems yang sudah diperbarui ke dalam cookies
      Cookies.set("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      // Jika item belum ada di dalam keranjang, tambahkan sebagai item baru
      const newItem = {
        id_obat: selectedObat.id,
        namaObat: selectedObat.namaObat,
        kuantitas: quantity,
        total_harga: selectedObat.harga * quantity,
        tanggal_transaksi: new Date().toISOString(),
        gambar: selectedObat.gambar, // Menyimpan URL gambar atau path file
      };
  
      // Tambahkan item baru ke data cartItems yang sudah ada
      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
  
      // Simpan data cartItems yang sudah diperbarui ke dalam cookies
      Cookies.set("cartItems", JSON.stringify(updatedCartItems));
    }
  
    window.location.reload(); // Refresh halaman untuk menampilkan perubahan
  };  
  

  return (
    <>
      <div className="container-fluid">
        <div className="col-lg">
          <div className="p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h4 text-gray-900 font-weight-bold mx-auto">
                Pembelian
              </h1>
            </div>
            <hr />

            <div className="row">
              {currentItems.map((obat, index) => (
                <div className="col-lg-4 mb-4" key={obat.id}>
                  <div className="card shadow">
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <img
                        className="card-img-top"
                        src={`http://localhost:8083/obats/gambar/${obat.id}`}
                        alt={obat.namaObat}
                        style={{
                          width: "150px",
                          height: "150px",
                          border: "2px solid #ccc",
                          borderRadius: "15px",
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "bold" }}>
                        {obat.namaObat}
                      </h5>
                      <p className="card-text">Merk: {obat.merk}</p>
                      <p
                        className="card-text"
                        style={{ fontStyle: "italic", fontWeight: "bold" }}
                      >
                        {formatRupiah(obat.harga)}
                      </p>
                      <p className="card-text">
                        Exp:{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {formatExpired(obat.tgl_kadaluarsa)}
                        </span>
                      </p>
                      <p className="card-text">Stok: {obat.stok}</p>
                      <div className="text-center">
                        {/* Menambahkan kondisi untuk menonaktifkan tombol beli jika stok 0 */}
                        <button
                          className="btn btn-sm btn-success btn-icon-split mr-2"
                          data-toggle="modal"
                          data-target="#detailModal"
                          onClick={() => handleBeli(obat)}
                          disabled={obat.stok === 0}
                        >
                          <span className="icon text-white-50">
                            <i className="fas fa-shopping-cart"></i>
                          </span>
                          <span className="text">Beli</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tambahkan navigasi untuk pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array(Math.ceil(obats.length / itemsPerPage))
                  .fill()
                  .map((_, index) => (
                    <li key={index} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ fontWeight: "bold" }}
              >
                Pembelian Obat
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
            <div className="modal-body modal-body-grid">
              <div className="d-flex flex-wrap">
                {selectedObat && (
                  <div className="col-xl-4 col-md-6 mb-4">
                    <img
                      src={`http://localhost:8083/obats/gambar/${selectedObat.id}`}
                      style={{
                        width: "210px",
                        height: "210px",
                        marginBottom: "10px",
                        display: "block",
                        border: "2px solid #ccc",
                        borderRadius: "15px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                )}

                {selectedObat && (
                  <div className="col-xl-8 col-md-6 mb-4">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontStyle: "italic",
                        fontSize: "20px",
                      }}
                    >
                      {selectedObat.namaObat}
                    </span>
                    <br />
                    <span style={{ fontStyle: "italic", fontSize: "15px" }}>
                      Harga: {formatRupiah(selectedObat.harga)}
                    </span>{" "}
                    <br />
                    <span style={{ fontStyle: "italic", fontSize: "15px" }}>
                      Stok : {selectedObat.stok}
                    </span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-primary mr-2"
                        onClick={() =>
                          setQuantity(quantity > 1 ? quantity - 1 : 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="form-control mr-2"
                        style={{ width: "60px" }}
                      />
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          setQuantity(
                            quantity < selectedObat.stok
                              ? quantity + 1
                              : quantity
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <hr />
                    <a
                      className="btn btn-sm btn-success btn-icon-split mr-2"
                      data-toggle="modal"
                      data-target="#detailModal"
                      onClick={addToCart}
                    >
                      <span className="icon text-white-50">
                        <i className="fas fa-shopping-cart"></i>
                      </span>
                      <span className="text">Beli</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <span className="font-weight-bold text-dark mb-1">
              </span>
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pembelian;
