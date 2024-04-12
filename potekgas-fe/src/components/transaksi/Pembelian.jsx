/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { listObats, deleteObat } from "../../services/ObatService";
import { useNavigate } from "react-router-dom";
import gambar from "../../assets/paracetramol.jpg";

function TabelObat() {
  const [obats, setObats] = useState([]);
  const navigator = useNavigate();

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

  function updateobatHandler(obat) {
    navigator(`/form-obat/${obat.id}`);
  }

  function deleteObatHandler(obt) {
    const obat = {
      id_obat: obt.id,
    };

    const isConfirmed = window.confirm(
      "Apakah Anda Yakin Ingin Menghapus Obat Ini?"
    );

    if (isConfirmed) {
      deleteObat(obat)
        .then(() => {
          loadObats();
        })
        .catch((error) => {
          console.error("Error deleting Obat:", error);
        });
    } else {
      alert("Batal Menghapus Obat");
    }
  }

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

          <a
            className="btn btn-sm btn-primary btn-icon-split mb-3"
            onClick={formObatHandler}
          >
            <span className="icon text-white-50">
              <i className="fas fa-plus"></i>
            </span>
            <span className="text">Tambah Obat</span>
          </a>

          <div className="row">
            {obats.map((obat, index) => (
              <div className="col-lg-4 mb-4" key={obat.id}>
                <div className="card shadow">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <img
                      className="card-img-top"
                      src={`http://localhost:8083/obats/gambar/${obat.id}`}
                      // alt={obat.namaObat}
                      style={{
                        width: "150px",
                        height: "150px",
                        border: "2px solid #ccc",
                        borderRadius: "15px",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    {`http://localhost:8083/obats/gambar/` + obat.id}
                    <h5 className="card-title">{obat.namaObat}</h5>
                    <p className="card-text">Merk: {obat.merk}</p>
                    <p className="card-text">Jenis: {obat.jenis}</p>
                    <p className="card-text">
                      Harga: {formatRupiah(obat.harga)}
                    </p>
                    <p className="card-text">Keterangan: {obat.keterangan}</p>
                    <p className="card-text">
                      Expired: {formatExpired(obat.tgl_kadaluarsa)}
                    </p>
                    <p className="card-text">Stok: {obat.stok}</p>
                    <p className="card-text">Status: {obat.status}</p>
                    <div className="text-center">
                      <a
                        className="btn btn-sm btn-warning btn-icon-split mr-2"
                        onClick={() => updateobatHandler(obat)}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-edit"></i>
                        </span>
                        <span className="text">Update</span>
                      </a>
                      <a
                        className="btn btn-sm btn-danger btn-icon-split"
                        onClick={() => deleteObatHandler(obat)}
                      >
                        <span className="icon text-white-50">
                          <i className="fas fa-trash"></i>
                        </span>
                        <span className="text">Hapus</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelObat;
