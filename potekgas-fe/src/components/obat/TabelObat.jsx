/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { listObats, deleteObat } from "../../services/ObatService";
import { useNavigate } from "react-router-dom";

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
      // weekday: "long",
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
      <div className="col-lg  ">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Data Obat</h1>
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

          <table id="dataTable" className="table table-hover table">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Nama Obat</th>
                <th>Merk Obat</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>Keterangan</th>
                <th>Expired</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {obats.map((obat, index) => (
                <tr key={obat.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{obat.namaObat}</td>
                  <td>{obat.merk}</td>
                  <td>{obat.jenis}</td>
                  <td>{formatRupiah(obat.harga)}</td>
                  <td>{obat.keterangan}</td>
                  <td>{formatExpired(obat.tgl_kadaluarsa)}</td>
                  <td>{obat.stok}</td>
                  <td>{obat.status}</td>
                  <td className="text-center">
                    <a
                      className="btn btn-sm btn-warning btn-icon-split"
                      onClick={() => updateobatHandler(obat)}
                    >
                      <span className="icon text-white-50">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span className="text">Update</span>
                    </a>{" "}
                    <a
                      className="btn btn-sm btn-danger btn-icon-split"
                      onClick={() => deleteObatHandler(obat)}
                    >
                      <span className="icon text-white-50">
                        <i className="fas fa-trash"></i>
                      </span>
                      <span className="text">Hapus</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TabelObat;
