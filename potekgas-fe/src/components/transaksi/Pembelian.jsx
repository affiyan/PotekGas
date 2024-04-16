/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { listObats, deleteObat } from "../../services/ObatService";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import gambar from "../../assets/paracetramol.jpg";

function TabelObat({ userId }) {
  const [obats, setObats] = useState([]);
  const [selectedObat, setSelectedObat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
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
    setShowModal(true);
  };

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

  const addToCart = () => {
      // Menambahkan item ke keranjang dengan menyertakan ID obat, kuantitas, total harga, dan tanggal transaksi
      const existingItemIndex = cartItems.findIndex(item => item.id_obat === selectedObat.id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].kuantitas += quantity;
        updatedCartItems[existingItemIndex].total_harga += selectedObat.harga * quantity;
        setCartItems(updatedCartItems);
        console.log("Yang ada di keranjang:", updatedCartItems); 
      } else {
        setCartItems(prevState => [
          ...prevState,
          {
            id_obat: selectedObat.id,
            kuantitas: quantity,
            total_harga: selectedObat.harga * quantity,
            tanggal_transaksi: new Date().toISOString()
          }
        ]);
        console.log("Yang ada di keranjang:", [...cartItems, { 
            id_obat: selectedObat.id,
            kuantitas: quantity,
            total_harga: selectedObat.harga * quantity,
            tanggal_transaksi: new Date().toISOString()
          }]); 
      }
      handleCloseModal();
  };

   return (
    <div className="container-fluid">
      <div className="col-lg">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
              Pembelian
            </h1>
          </div>
          <hr />

          <div className="row">
            {obats.map((obat, index) => (
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
                      <a
                        className="btn btn-sm btn-success btn-icon-split mr-2"
                        onClick={() => handleBeli(obat)}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-shopping-cart"></i>
                        </span>
                        <span className="text">Beli</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedObat && (
      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
              <Modal.Title>
                <span style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "35px"}}>
                  Pembelian Obat
                </span>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={`http://localhost:8083/obats/gambar/${selectedObat.id}`}

              style={{ width: "100%", marginBottom: "10px" }}
            />
            <p
              style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "30px" }}>
              {selectedObat.namaObat}
            </p>
            <p 
              style={{fontStyle: "italic", fontSize: "25px" }}>
              Harga: {formatRupiah(selectedObat.harga)}
            </p>
            <p>Stok: {selectedObat.stok}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-primary mr-2"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
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
                  setQuantity(quantity < selectedObat.stok ? quantity + 1 : quantity)
                }
              >
                +
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={addToCart}>
              Beli
            </Button>
          </Modal.Footer>
        </Modal>    
      )}
    </div>
  );
}
export default TabelObat;
